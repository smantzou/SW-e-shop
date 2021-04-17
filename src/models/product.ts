import { getModelForClass, prop } from '@typegoose/typegoose';

class ProductClass {
  @prop()
  public title?: string;
  @prop()
  public description?: string;
  @prop()
  public inStock?: number;
  @prop()
  public price: number;
}

const ProductModel = getModelForClass(ProductClass);

export default { ProductModel, ProductClass };
