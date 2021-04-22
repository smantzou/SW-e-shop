import CreateUserDto from '../dtos/user';
import * as express from 'express';
import validationMiddleware from '../middleware/validation';
import { modifyUser, deleteAUser, getAllUsers, getUserById } from '../services/user';
import Controller from '../interfaces/controller';
import authMiddleware from '../middleware/authentication';

class UserController implements Controller {
  public path = '/users';
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.patch(`${this.path}/:id`, authMiddleware, validationMiddleware(CreateUserDto), modifyUser);
    this.router.delete(`${this.path}/:id`, authMiddleware, deleteAUser);
    this.router.get(`${this.path}/`, authMiddleware, getAllUsers);
    this.router.get(`${this.path}/:id`, authMiddleware, getUserById);
  }
}

export default UserController;
