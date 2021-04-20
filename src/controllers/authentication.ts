import * as express from 'express';

import Controller from '../interfaces/controller';
import validationMiddleware from '../middleware/validation';
import CreateUserDto from '../dtos/user';
import LogInDto from '../dtos/logIn';
import { registration, loggingIn, loggingOut } from '../services/authentication';

class AuthenticationController implements Controller {
  public path = '/auth';
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`, validationMiddleware(CreateUserDto), registration);
    this.router.post(`${this.path}/login`, validationMiddleware(LogInDto), loggingIn);
    this.router.get(`${this.path}/logout`, loggingOut);
  }
}

export default AuthenticationController;
