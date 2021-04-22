import { IsString, IsNumber, IsInt } from 'class-validator';

class CreateUserDto {
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
  @IsInt()
  public telephoneNumber: number;
}

export default CreateUserDto;
