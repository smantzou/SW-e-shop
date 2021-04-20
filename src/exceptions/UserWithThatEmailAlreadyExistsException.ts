import HttpException from './HttpException';

class UserWithThatEmailAlreadyExistsException extends HttpException {
  constructor(email: string) {
    super(400, `Email: ${email} already claimed!`);
  }
}

export default UserWithThatEmailAlreadyExistsException;
