import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
export class UpdateUserDto {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  first_name: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  last_name: string;
}
