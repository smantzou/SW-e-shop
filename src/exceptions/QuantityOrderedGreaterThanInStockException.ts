import HttpException from './HttpException';

class QuantityOrderedGreaterThanInStockException extends HttpException {
  constructor() {
    super(400, 'Quantity ordered greater than in stock!');
  }
}

export default QuantityOrderedGreaterThanInStockException;
