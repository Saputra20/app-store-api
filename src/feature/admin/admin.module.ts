import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { Admin } from './entities/admin.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Role } from '../role/entities/role.entity';
import { Account } from '../account/entities/account.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Admin, Role, Account])],
  controllers: [AdminController],
  providers: [AdminService],
  exports: [AdminService],
})
export class AdminModule {}
