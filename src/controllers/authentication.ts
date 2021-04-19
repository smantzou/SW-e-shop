import * as express from 'express';

import Controller from '../interfaces/controller';
import validationMiddleware from '../middleware/validation';
import CreateCustomerDto from '../dtos/customer';
import LogInDto from '../dtos/logIn';
import { registration, loggingIn } from '../services/authorization';

class AuthenticationController implements Controller {
  public path = '/auth';
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`, validationMiddleware(CreateCustomerDto), registration);
    this.router.post(`${this.path}/login`, validationMiddleware(LogInDto), loggingIn);
  }
}

export default AuthenticationController;
