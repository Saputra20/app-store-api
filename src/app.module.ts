import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import config from './common/config';
import mikroOrmConfig from 'src/mikro-orm.config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { AccountModule } from './feature/account/account.module';
import { RoleModule } from './feature/role/role.module';
import { SinceModule } from './feature/since/since.module';
import { AdminModule } from './feature/admin/admin.module';
import { OwnerModule } from './feature/owner/owner.module';
import { MerchantModule } from './feature/merchant/merchant.module';
import { EmployeeModule } from './feature/employee/employee.module';
import { CustomerModule } from './feature/customer/customer.module';
import { AuthModule } from './feature/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    MikroOrmModule.forRoot(mikroOrmConfig()),
    AccountModule,
    RoleModule,
    SinceModule,
    AdminModule,
    OwnerModule,
    MerchantModule,
    EmployeeModule,
    CustomerModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({ whitelist: true, transform: true }),
    },
  ],
})
export class AppModule {}
