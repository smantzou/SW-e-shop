import { IsString, IsInt, IsMongoId, IsPositive } from 'class-validator';

class CreateOrderDto {
  @IsMongoId()
  public customer: string;
  @IsMongoId()
  public product: string;
  @IsPositive()
  @IsInt()
  public quantity: number;
  @IsString()
  public paymentMethod: string;
}

export default CreateOrderDto;
