import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import config from './common/config';
import mikroOrmConfig from 'src/mikro-orm.config';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { AccountModule } from './feature/account/account.module';
import { RoleModule } from './feature/role/role.module';
import { SinceModule } from './feature/since/since.module';
import { AdminModule } from './feature/admin/admin.module';
import { OwnerModule } from './feature/owner/owner.module';
import { MerchantModule } from './feature/merchant/merchant.module';
import { EmployeeModule } from './feature/employee/employee.module';
import { CustomerModule } from './feature/customer/customer.module';
import { AuthModule } from './feature/auth/auth.module';
import { BullModule } from '@nestjs/bull';
import { QueueModule } from './queue/queue.module';
import { MiscModule } from './feature/misc/misc.module';
import { MeModule } from './feature/me/me.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    MikroOrmModule.forRoot(mikroOrmConfig()),
    EventEmitterModule.forRoot(),
    AuthModule,
    RoleModule,
    AdminModule,
    OwnerModule,
    AccountModule,
    SinceModule,
    MerchantModule,
    EmployeeModule,
    CustomerModule,
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    QueueModule,
    MiscModule,
    MeModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_PIPE,
      useFactory: () =>
        new ValidationPipe({ whitelist: true, transform: true }),
    },
  ],
})
export class AppModule {}
