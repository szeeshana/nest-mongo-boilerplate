import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
  async create(createUserDto: CreateUserDto) {
    return this.userModel.create(createUserDto);
  }

  async findAll() {
    return this.userModel.find();
  }

  findOne(_id: string) {
    return this.userModel.findOne({ _id });
  }
  filterAll(options: any) {
    return this.userModel.find(options);
  }
  findMe(_id: string) {
    return this.userModel.findOne({ _id });
  }
  update(_id: string, updateUserDto: UpdateUserDto) {
    return this.userModel.findByIdAndUpdate(
      _id,
      {
        $set: {
          first_name: updateUserDto?.first_name,
          last_name: updateUserDto?.last_name,
        },
      },
      { new: true },
    );
  }

  async updateProfile(_id: string, updateUserObj: any) {
    return await this.userModel.findByIdAndUpdate(_id, updateUserObj, {
      new: true,
    });
  }

  remove(_id: string) {
    return this.userModel.deleteOne({ _id });
  }
}
