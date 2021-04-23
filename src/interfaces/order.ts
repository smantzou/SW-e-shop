import * as mongoose from 'mongoose';

interface Order {
  _id: string;
  customer: mongoose.Schema.Types.ObjectId;
  product: mongoose.Schema.Types.ObjectId;
  quantity: number;
  paymentMethod: string;
  uuid: string;
  date: Date;
}

export default Order;
