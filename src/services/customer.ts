/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import CreateCustomerDto from 'dtos/customer';
import * as express from 'express';
import RequestWithCustomer from 'interfaces/requestWithCustomer';
import CustomerNotFoundException from '../exceptions/CustomerNotFoundException';
import customerModel from '../models/customer';

const getAllCustomers = (request: express.Request, response: express.Response) => {
  customerModel.find().then((customers) => {
    response.send(customers);
  });
};

const getCustomerById = (request: express.Request, response: express.Response, next: express.NextFunction) => {
  const id = request.params.id;
  customerModel.findById(id).then((customer) => {
    if (customer) {
      response.send(customer);
    } else {
      next(new CustomerNotFoundException(id));
    }
  });
};

const createCustomer = (request: RequestWithCustomer, response: express.Response, next: express.NextFunction) => {
  const customerData: CreateCustomerDto = request.body;
  const createdCustomer = new customerModel(customerData);
  createdCustomer.save().then((savedCustomer) => {
    response.status(200).send(savedCustomer);
  });
};

export { getAllCustomers, getCustomerById, createCustomer };
