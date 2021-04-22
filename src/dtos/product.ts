import { IsString, IsNumber, IsPositive, IsInt } from 'class-validator';

class CreateProductDto {
  @IsString()
  public title: string;
  @IsNumber()
  @IsPositive()
  @IsInt()
  public inStock: number;
  @IsString()
  public description: string;
  @IsNumber()
  @IsPositive()
  public price: number;
}

export default CreateProductDto;
