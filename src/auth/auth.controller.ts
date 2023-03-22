import { LoginUserDto } from './dto/login.dto';
import {
  Controller,
  UseGuards,
  Post,
  Req,
  Body,
  HttpCode,
  HttpStatus,
  ConflictException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { enCodePassword } from '../utils/helpers/db.helpers';
import { Request } from 'express';
import { UserService } from './../user/user.service';
import { RegisterUserDto } from './dto/register.user.dto';
import { ERROR_MESSAGES } from 'src/utils/constants/generic.constants';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @UseGuards(AuthGuard('local'))
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() body: LoginUserDto, @Req() req: Request) {
    return this.authService.login(req.user);
  }

  @Post('register')
  async create(@Body() registerUserDto: RegisterUserDto) {
    const userData = await this.userService.filterAll({
      email: registerUserDto.email,
      role: registerUserDto.role,
    });
    if (userData.length > 0) {
      throw new ConflictException(ERROR_MESSAGES.USER_DUPLICATE);
    }
    registerUserDto.password = enCodePassword(registerUserDto.password);
    return this.userService.create(registerUserDto);
  }
}
