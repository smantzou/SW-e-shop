import * as mongoose from 'mongoose';
import Product from '../interfaces/product';

const productSchema = new mongoose.Schema({
  title: String,
  inStock: Number,
  description: String,
  price: Number,
});

const productModel = mongoose.model<Product & mongoose.Document>('Product', productSchema);

export default productModel;
