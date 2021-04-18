/* eslint-disable @typescript-eslint/explicit-module-boundary-types */

import * as express from 'express';
import CreateCustomerDto from '../dtos/customer';
import Controller from '../interfaces/controller';
import validationMiddleware from '../middleware/validation';
import { getAllCustomers, createCustomer, getCustomerById } from '../services/customer';
class CustomerController implements Controller {
  public path = '/customers';
  public router = express.Router();

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, getAllCustomers);
    this.router.post(this.path, validationMiddleware(CreateCustomerDto), createCustomer);
    this.router.get(`${this.path}/:id`, getCustomerById);
  }
}

export default CustomerController;
