import { Command } from 'nestjs-command';
import { Injectable } from '@nestjs/common';

import { UserService } from '../user.service';
import { UserType } from '../enum/user.enum';
import { enCodePassword } from 'src/utils/helpers/db.helpers';
import { ConfigService } from '@nestjs/config';
const fs = require('fs');
const getStream = require('get-stream');
@Injectable()
export class UserSeed {
  constructor(
    private readonly userService: UserService,
    private configService: ConfigService,
  ) {}

  @Command({
    command: 'u',
    aliases: 'cua',
    describe: `Creating an admin with email using environment variable EMAIL_FOR_ADMIN`,
  })
  async createAdmin() {
    const user = await this.userService.create({
      first_name: 'Admin',
      last_name: 'Admin',
      email: this.configService.get('seed.user.admin'),
      password: enCodePassword('test123'),
      role: UserType.ADMIN,
    });
    console.info(`Created : `, user);
  }

  @Command({
    command: 'create:user:user',
    aliases: 'cuc',
    describe: `Creating an user with email using environment variable EMAIL_FOR_USER`,
  })
  async createUser() {
    const user = await this.userService.create({
      first_name: 'User',
      last_name: 'User',
      email: this.configService.get('seed.user.user'),
      password: enCodePassword('test123'),
      role: UserType.USER,
    });
    console.info(`Created : `, user);
  }
}
