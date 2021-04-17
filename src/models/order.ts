import { getModelForClass, prop, Ref } from '@typegoose/typegoose';
import CustomerClass from './customer';
import ProductClass from './product';

class OrderClass {
  @prop({ ref: () => CustomerClass, type: () => String })
  public orderedBy?: Ref<CustomerClass>;
  @prop({ ref: () => ProductClass, type: () => String })
  public productOrdered?: Ref<ProductClass>;
  @prop()
  public orderedAt?: Date;
  @prop()
  public paymentMethod?: string;
  @prop()
  public quantity: number;
}

const OrderModel = getModelForClass(OrderClass);

export default OrderModel;
