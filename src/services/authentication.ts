/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as express from 'express';
import * as bcrypt from 'bcryptjs';
import CreateUserDto from 'dtos/user';
import UserWithThatEmailAlreadyExistsException from '../exceptions/UserWithThatEmailAlreadyExistsException';
import WrongCredentialsException from '../exceptions/WrongCredentialsException';
import { secret } from '../config/index';
import tokenData from '../interfaces/tokenData';
import userModel from '../models/user';
import LogInDto from '../dtos/logIn';
import User from 'interfaces/user';
import DataStoredInToken from 'interfaces/DataStoredInToken';
import * as jwt from 'jsonwebtoken';
import RequestWithUser from '../interfaces/requestWithUser';

const registration = async (request: RequestWithUser, response: express.Response, next: express.NextFunction) => {
  const userData: CreateUserDto = request.body;
  if (await userModel.findOne({ email: userData.email })) {
    next(new UserWithThatEmailAlreadyExistsException(userData.email));
  } else {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const user = await userModel.create({
      ...userData,
      password: hashedPassword,
    });
    user.password = undefined;
    const tokenData: tokenData = createToken(user);
    response.cookie('Set-Cookie', [createCookie(tokenData)]);
    response.status(200).json({
      User: user,
    });
  }
};

function createToken(customer: User) {
  const expiresIn = 60 * 60; // an hour

  const dataStoredInToken: DataStoredInToken = {
    _id: customer._id,
  };
  return {
    expiresIn,
    token: jwt.sign(dataStoredInToken, secret, { expiresIn }),
  };
}

const loggingIn = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
  const logInData: LogInDto = request.body;
  const customer = await userModel.findOne({ email: logInData.email });
  if (customer) {
    const isPasswordMatching = await bcrypt.compare(logInData.password, customer.password);
    if (isPasswordMatching) {
      customer.password = undefined;
      const tokenData: tokenData = createToken(customer);
      response.cookie('Set-Cookie', [createCookie(tokenData)]);
      response.status(200).json({
        Customer: customer,
      });
    } else {
      next(new WrongCredentialsException());
    }
  } else {
    next(new WrongCredentialsException());
  }
};

const createCookie = async (tokenData: tokenData) => {
  return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
};

const loggingOut = (request: express.Request, response: express.Response, next: express.NextFunction) => {
  response.clearCookie('Set-Cookie');
  response.sendStatus(200);
};

export { loggingIn, registration, loggingOut };
