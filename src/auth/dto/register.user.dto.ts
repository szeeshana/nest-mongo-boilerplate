import { IsString, IsNotEmpty, IsEmail, IsEnum } from 'class-validator';
import { UserType } from 'src/user/enum/user.enum';

export class RegisterUserDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsEnum(UserType)
  role: UserType;
}
