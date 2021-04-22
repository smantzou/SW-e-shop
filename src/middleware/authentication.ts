/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { NextFunction, Response, Request } from 'express';
import * as jwt from 'jsonwebtoken';
import AuthenticationTokenMissingException from '../exceptions/AuthenticationTokenMissingException';
import WrongAuthenticationTokenException from '../exceptions/WrongAuthenticationTokenException';
import DataStoredInToken from '../interfaces/dataStoredInToken';
import userModel from '../models/user';
import { secret } from '../config/index';

async function authMiddleware(request: Request, response: Response, next: NextFunction) {
  const cookies = request.cookies;
  console.log(cookies);
  if (cookies && cookies.Authentication) {
    try {
      const verificationResponse = jwt.verify(cookies.Authentication, secret) as DataStoredInToken;
      const id = verificationResponse._id;
      const user = await userModel.findById(id);
      if (user) {
        next();
      } else {
        next(new WrongAuthenticationTokenException());
      }
    } catch (error) {
      next(new WrongAuthenticationTokenException());
    }
  } else {
    next(new AuthenticationTokenMissingException());
  }
}

export default authMiddleware;
