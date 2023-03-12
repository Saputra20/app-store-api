import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Customer } from './entities/customer.entity';
import { Account } from '../account/entities/account.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Customer, Account])],
  controllers: [CustomerController],
  providers: [CustomerService],
})
export class CustomerModule {}
