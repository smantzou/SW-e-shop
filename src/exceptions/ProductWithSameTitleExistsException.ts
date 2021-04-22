import HttpException from './HttpException';

class ProductWithSameTitleExistsException extends HttpException {
  constructor(title: string) {
    super(400, `Product with name: ${title} already exists!`);
  }
}

export default ProductWithSameTitleExistsException;
