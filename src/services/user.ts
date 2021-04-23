/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import WrongCredentialsException from '../exceptions/WrongCredentialsException';
import * as express from 'express';
import * as bcrypt from 'bcryptjs';
import RequestWithUser from '../interfaces/requestWithUser';
import userModel from '../models/user';
import UserWithThatEmailAlreadyExistsException from '../exceptions/UserWithThatEmailAlreadyExistsException';
import HttpException from '../exceptions/HttpException';
import CreateUserDto from '../dtos/user';
import NotFoundException from '../exceptions/NotFoundException';

const modifyUser = async (request: RequestWithUser, response: express.Response, next: express.NextFunction) => {
  const userData: CreateUserDto = request.body;
  const _id = request.params.id;
  try {
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
  } catch (error) {
    return next(new HttpException(500, 'Internal Server Error'));
  }
};

const deleteAUser = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
  const _id = request.params.id;
  try {
    await userModel.findByIdAndDelete({ _id });
    return response.sendStatus(200);
  } catch (error) {
    return next(new WrongCredentialsException());
  }
};

const getAllUsers = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
  try {
    const users = await userModel.find();
    return response.status(200).json({
      Users: users,
    });
  } catch (error) {
    return next(new HttpException(500, 'Internal Server Error'));
  }
};

const getUserById = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
  try {
    const _id = request.params.id;
    const user = await userModel.findById({ _id });
    if (!user) {
      return next(new NotFoundException());
    }
    return response.status(200).json({
      User: user,
    });
  } catch (error) {
    return next(new WrongCredentialsException());
  }
};

export { modifyUser, deleteAUser, getAllUsers, getUserById };
