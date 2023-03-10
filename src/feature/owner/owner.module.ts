import { Module } from '@nestjs/common';
import { OwnerService } from './owner.service';
import { OwnerController } from './owner.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Owner } from './entities/owner.entity';
import { Account } from '../account/entities/account.entity';
import { MerchantModule } from '../merchant/merchant.module';

@Module({
  imports: [MerchantModule, MikroOrmModule.forFeature([Owner, Account])],
  controllers: [OwnerController],
  providers: [OwnerService],
})
export class OwnerModule {}
