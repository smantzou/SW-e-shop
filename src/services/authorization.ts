/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as express from 'express';
import * as bcrypt from 'bcryptjs';
import CreateCustomerDto from 'dtos/customer';
import CustomerWithThatEmailAlreadyExistsException from '../exceptions/CustomerWithThatEmailAlreadyExistsException';
import WrongCredentialsException from '../exceptions/WrongCredentialsException';
import { secret } from '../config/index';
import tokenData from '../interfaces/tokenData';
import customerModel from '../models/customer';
import LogInDto from '../dtos/logIn';
import Customer from 'interfaces/customer';
import DataStoredInToken from 'interfaces/DataStoredInToken';
import * as jwt from 'jsonwebtoken';

const registration = async (request: express.Request, response: express.Response, next: express.NextFunction) => {
  const customerData: CreateCustomerDto = request.body;
  if (await customerModel.findOne({ email: customerData.email })) {
    next(new CustomerWithThatEmailAlreadyExistsException(customerData.email));
  } else {
    const hashedPassword = await bcrypt.hash(customerData.password, 10);
    const customer = await customerModel.create({
      ...customerData,
      password: hashedPassword,
    });
    customer.password = undefined;
    const tokenData: tokenData = createToken(customer);
    response.cookie('Set-Cookie', [createCookie(tokenData)]);
    response.send(customer);
  }
};

function createToken(customer: Customer) {
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
  const customer = await customerModel.findOne({ email: logInData.email });
  if (customer) {
    const isPasswordMatching = await bcrypt.compare(logInData.password, customer.password);
    if (isPasswordMatching) {
      customer.password = undefined;
      const tokenData: tokenData = createToken(customer);
      response.cookie('Set-Cookie', [createCookie(tokenData)]);
      response.send(customer);
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

const loggingOut = (request: express.Request, response: express.Response) => {
  response.cookie('Set-Cookie', ['Authorization=;Max-age=0']);
  response.send(200);
};

export { loggingIn, registration, loggingOut };
