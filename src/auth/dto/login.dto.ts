import { IsString, IsNotEmpty, IsEmail, IsEnum } from 'class-validator';
export class LoginUserDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
