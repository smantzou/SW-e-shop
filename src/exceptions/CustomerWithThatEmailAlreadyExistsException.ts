import HttpException from './HttpException';

class CustomerWithThatEmailAlreadyExistsException extends HttpException {
  constructor(email: string) {
    super(400, `Email: ${email} already claimed!`);
  }
}

export default CustomerWithThatEmailAlreadyExistsException;
