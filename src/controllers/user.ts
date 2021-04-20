import CreateUserDto from '../dtos/user';
import * as express from 'express';
import validationMiddleware from '../middleware/validation';
import { modifyUser, deleteAUser, getAllUsers, getUserById } from '../services/user';
import Controller from '../interfaces/controller';

class UserController implements Controller {
  public path = '/users';
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.patch(`${this.path}/:id`, validationMiddleware(CreateUserDto), modifyUser);
    this.router.delete(`${this.path}/:id`, deleteAUser);
    this.router.get(`${this.path}/`, getAllUsers);
    this.router.get(`${this.path}/:id`, getUserById);
  }
}

export default UserController;
