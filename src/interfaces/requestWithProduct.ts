import { Request } from 'express';
import Product from './product';

interface RequestWithProduct extends Request {
  product: Product;
}

export default RequestWithProduct;
