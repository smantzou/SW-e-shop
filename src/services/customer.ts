/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import * as express from 'express';
import CustomerNotFoundException from '../exceptions/CustomerNotFoundException';
import Customer from '../interfaces/customer';
import customerModel from '../models/customer';

const getAllCustomers = (request: express.Request, response: express.Response, next: express.NextFunction) => {
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

const createCustomer = (request: express.Request, response: express.Response, next: express.NextFunction) => {
  const customerData: Customer = request.body;
  const createdCustomer = new customerModel(customerData);
  createdCustomer.save().then((savedCustomer) => {
    response.send(savedCustomer);
  });
};

export { getAllCustomers, getCustomerById, createCustomer };
