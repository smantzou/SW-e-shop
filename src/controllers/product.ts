import * as express from 'express';
import Controller from '../interfaces/controller';
import CreateProductDto from '../dtos/product';
import { getAllProducts, createAProduct, getProductById, modifyProduct, deleteAProduct } from '../services/product';
import validationMiddleware from '../middleware/validation';
class ProductController implements Controller {
  public path = '/products';
  public router = express.Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, getAllProducts);
    this.router.post(`${this.path}/`, validationMiddleware(CreateProductDto), createAProduct);
    this.router.get(`${this.path}/:id`, getProductById);
    this.router.patch(`${this.path}/:id`, validationMiddleware(CreateProductDto), modifyProduct);
    this.router.delete(`${this.path}/:id`, deleteAProduct);
  }
}

export default ProductController;
