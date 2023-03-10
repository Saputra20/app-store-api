import { Module } from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { MerchantController } from './merchant.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Merchant } from './entities/merchant.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Merchant])],
  controllers: [MerchantController],
  providers: [MerchantService],
  exports: [MerchantService],
})
export class MerchantModule {}
