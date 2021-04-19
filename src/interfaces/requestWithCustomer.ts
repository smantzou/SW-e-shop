import { Request } from 'express';
import Customer from './customer';

interface RequestWithCustomer extends Request {
  customer: Customer;
}

export default RequestWithCustomer;
