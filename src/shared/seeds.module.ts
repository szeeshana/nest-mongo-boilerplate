import { UserModule } from '../user/user.module';
import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';

import { UserSeed } from '../user/seed/user.seed';
@Module({
  imports: [UserModule, CommandModule],
  providers: [UserSeed],
  exports: [UserSeed],
})
export class SeedsModule {}
