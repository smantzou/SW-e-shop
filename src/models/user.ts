import * as mongoose from 'mongoose';
import User from '../interfaces/user';

const userSchema = new mongoose.Schema({
  name: String,
  surname: String,
  email: String,
  username: String,
  password: String,
  address: [String],
  telephoneNumber: String,
});

const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);
export default userModel;
