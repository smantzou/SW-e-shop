import { IsString, IsNumber } from 'class-validator';

class CreateCustomerDto {
  @IsString()
  public name: string;
  @IsString()
  public surname: string;
  @IsString()
  public email: string;
  @IsString()
  public username: string;
  @IsString()
  public password: string;
  @IsString()
  public address: string;
  @IsNumber()
  public telephoneNumber: number;
}

export default CreateCustomerDto;
