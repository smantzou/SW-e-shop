/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import WrongCredentialsException from '../exceptions/WrongCredentialsException';
import * as express from 'express';
import * as bcrypt from 'bcryptjs';
import RequestWithUser from '../interfaces/requestWithUser';
import User from '../interfaces/user';
import userModel from '../models/user';
import UserWithThatEmailAlreadyExistsException from '../exceptions/UserWithThatEmailAlreadyExistsException';
import HttpException from '../exceptions/HttpException';

const modifyUser = async (request: RequestWithUser, response: express.Response, next: express.NextFunction) => {
  const userData: User = request.body;
  const _id = request.params.id;
  const userToModify = await userModel.findById({ _id });
  if (!userToModify) {
    return next(new WrongCredentialsException());
  }
  const numberofEntriesWithThisEmail: number = await userModel.countDocuments({
    email: userData.email,
  });

  if (numberofEntriesWithThisEmail >= 1 && userData.email !== userToModify.email) {
    return next(new UserWithThatEmailAlreadyExistsException(userData.email));
  }

  if (!(userData.password === userToModify.password)) {
    userData.password = await bcrypt.hash(userData.password, 10);
  }
  await userModel.findByIdAndUpdate({ _id }, userData);
  return response.status(200).json({
    message: 'User data updated successfully!',
  });
};

const deleteAUser = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
  const _id = request.params.id;
  try {
    await userModel.findByIdAndDelete({ _id });
    return response.sendStatus(200);
  } catch (error) {
    return next(new HttpException(500, 'Internal Server Error'));
  }
};

const getAllUsers = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
  const users = await userModel.find();
  return response.status(200).json({
    Users: users,
  });
};

const getUserById = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
  const _id = request.params.id;
  const user = await userModel.findById({ _id });
  return response.status(200).json({
    user,
  });
};

export { modifyUser, deleteAUser, getAllUsers, getUserById };
