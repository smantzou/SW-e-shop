import HttpException from './HttpException';

class WrongAuthenticationTokenException extends HttpException {
  constructor() {
    super(401, 'Wrong Authentication Token');
  }
}

export default WrongAuthenticationTokenException;
