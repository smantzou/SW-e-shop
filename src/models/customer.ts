import { getModelForClass, prop } from '@typegoose/typegoose';
import PersonClass from './person';

class CustomerClass extends PersonClass {
  @prop()
  public adress?: string;
  @prop()
  public telephoneNumber?: string;
}
const CustomerModel = getModelForClass(CustomerClass);
export default { CustomerModel, CustomerClass };
