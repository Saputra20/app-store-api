import { Module } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { MerchantController } from './merchant.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Merchant } from './entities/merchant.entity';
import { Owner } from '../owner/entities/owner.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Merchant, Owner])],
  controllers: [MerchantController],
  providers: [MerchantService],
  exports: [MerchantService],
})
export class MerchantModule {}
