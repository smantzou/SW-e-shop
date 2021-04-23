import * as mongoose from 'mongoose';
import Order from '../interfaces/order';

const orderSchema = new mongoose.Schema({
  customer: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
  },
  product: {
    ref: 'Product',
    type: mongoose.Schema.Types.ObjectId,
  },
  quantity: Number,
  paymentMethod: {
    type: String,
    enum: ['Paypal', 'Cash On Delivery', 'Visa'],
  },
  date: Date,
  uuid: String,
});

const orderModel = mongoose.model<Order & mongoose.Document>('Order', orderSchema);

export default orderModel;
