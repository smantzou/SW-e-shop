import * as mongoose from 'mongoose';
import Customer from '../interfaces/customer';

const customerSchema = new mongoose.Schema({
  name: String,
  surname: String,
  email: String,
  username: String,
  password: String,
  address: String,
  telephoneNumber: String,
});

const customerModel = mongoose.model<Customer & mongoose.Document>('Customer', customerSchema);
export default customerModel;
