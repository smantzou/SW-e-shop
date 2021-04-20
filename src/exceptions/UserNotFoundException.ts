import HttpException from './HttpException';

class UserNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `Customer with id ${id} not found`);
  }
}

export default UserNotFoundException;
