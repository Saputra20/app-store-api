import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountController } from './account.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Account } from './entities/account.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Account])],
  controllers: [AccountController],
  providers: [AccountService],
  exports: [AccountService],
})
export class AccountModule {}
