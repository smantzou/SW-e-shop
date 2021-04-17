import { prop } from '@typegoose/typegoose';

class PersonClass {
  @prop()
  public name?: string;
  @prop()
  public surname?: string;
  @prop()
  public email?: string;
  @prop()
  public username?: string;
  @prop()
  public password?: string;
}

export default PersonClass;
