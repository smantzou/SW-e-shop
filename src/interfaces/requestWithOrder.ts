import { Request } from 'express';
import Order from './order';

interface RequestWithOrder extends Request {
  order: Order;
}

export default RequestWithOrder;
