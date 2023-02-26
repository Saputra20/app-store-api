import { Module } from '@nestjs/common';
import { AccountModule } from '../account/account.module';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { LocalStrategy, JwtStrategy } from '../../authentication/strategy';
import { LocalAuthGuard, JwtAuthGuard } from '../../authentication/guard';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { IAppConfig } from '../../common/config/interface';
import { ForgetPasswordListener } from './listener';

@Module({
  imports: [
    AccountModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        const app = configService.get<IAppConfig>('app');
        return {
          secret: app.secretKey,
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    LocalAuthGuard,
    JwtAuthGuard,
    ForgetPasswordListener,
  ],
})
export class AuthModule {}
