import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
  Req,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { enCodePassword } from '../utils/helpers/db.helpers';
import { CommonChecksDTO } from 'src/utils/common/dto/common.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/utils/guards/role.guard';
import { UserType } from './enum/user.enum';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const password = enCodePassword(createUserDto.password);
    return this.userService.create(createUserDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'), new RoleGuard(UserType.ADMIN))
  async findAll() {
    return this.userService.findAll();
  }
  @Get('me')
  @UseGuards(AuthGuard('jwt'))
  async findMe(@Req() req) {
    const userData = await this.userService.findMe(req.user._id);
    if (!userData) {
      throw new NotFoundException();
    }
    return userData;
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param() params: CommonChecksDTO) {
    const response = await this.userService.findOne(params.id);
    if (!response) throw new NotFoundException();
    return response;
  }

  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  async update(
    @Req() req,
    @Param() params: CommonChecksDTO,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const userData = await this.userService.findOne(params.id);
    if (!userData) {
      throw new NotFoundException();
    }
    return this.userService.update(params.id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  async remove(@Param() params: CommonChecksDTO) {
    const userData = await this.userService.findOne(params.id);
    if (!userData) {
      throw new NotFoundException();
    }
    return this.userService.remove(params.id);
  }
}
