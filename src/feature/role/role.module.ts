import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Role } from './entities/role.entity';
import { AdminModule } from '../admin/admin.module';

@Module({
  imports: [AdminModule, MikroOrmModule.forFeature([Role])],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule {}
