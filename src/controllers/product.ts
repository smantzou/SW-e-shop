import * as express from 'express';
import Controller from '../interfaces/controller';
import CreateProductDto from '../dtos/product';
import { getAllProducts, createAProduct, getProductById, modifyProduct, deleteAProduct } from '../services/product';
import validationMiddleware from '../middleware/validation';
import authMiddleware from '../middleware/authentication';
class ProductController implements Controller {
  public path = '/products';
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, getAllProducts);
    this.router.post(`${this.path}/`, authMiddleware, validationMiddleware(CreateProductDto), createAProduct);
    this.router.get(`${this.path}/:id`, getProductById);
    this.router.patch(`${this.path}/:id`, authMiddleware, validationMiddleware(CreateProductDto), modifyProduct);
    this.router.delete(`${this.path}/:id`, authMiddleware, deleteAProduct);
  }
}

export default ProductController;
