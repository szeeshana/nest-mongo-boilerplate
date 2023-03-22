import {
  Injectable,
  UnauthorizedException,
  NotFoundException,
  BadRequestException,
  MethodNotAllowedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../user/schemas/user.schema';
import { comparePassword } from '../utils/helpers/db.helpers';
import { Model } from 'mongoose';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserType } from 'src/user/enum/user.enum';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validateUser(
    email: string,
    pass: string,
    role: UserType,
  ): Promise<any> {
    if (role === UserType.ADMIN || role === UserType.USER) {
      let user: any = await this.findUser(email, role);
      if (user) {
        const matchPassword = comparePassword(pass, user.password);
        if (matchPassword) {
          user = user.toJSON();
          delete user.password;
          return user;
        }
        throw new UnauthorizedException('Password not match !');
      }
    } else {
      throw new UnauthorizedException('Please enter valid role');
    }
  }
  findUser(email: string, role: string) {
    return this.userModel
      .findOne({
        role: role,
        email: email,
      })
      .select('first_name last_name password email role');
  }
  async login(payload: any) {
    return {
      access_token: this.jwtService.sign({ ...payload }),
    };
  }
}
