import * as express from 'express';
import { getAllOrders, getOrderById, createAnOrder, deleteAnOrder, getAllOrdersOfCustomer } from '../services/order';
import validationMiddleware from '../middleware/validation';
import authMiddleware from '../middleware/authentication';
import Controller from '../interfaces/controller';
import CreateOrderDto from '../dtos/order';

class OrderController implements Controller {
  public path = '/orders';
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }
  private initializeRoutes() {
    this.router.get(`${this.path}/`, authMiddleware, getAllOrders);
    this.router.get(`${this.path}/:id`, authMiddleware, getOrderById);
    this.router.post(`${this.path}/`, authMiddleware, validationMiddleware(CreateOrderDto), createAnOrder);
    this.router.delete(`${this.path}/:id`, authMiddleware, deleteAnOrder);
    this.router.get(`${this.path}/customer/:id`, authMiddleware, getAllOrdersOfCustomer);
  }
}

export default OrderController;
