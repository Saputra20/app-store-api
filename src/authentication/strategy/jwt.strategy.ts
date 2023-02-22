import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { AccountService } from '../../feature/account/account.service';
import { TokenType } from '../../common/enum/token-type.enum';
import { IJwtPayload } from '../interface/jwt-payload.interface';

export const JWT_AUTH = 'jwtAuth';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, JWT_AUTH) {
  constructor(
    private readonly configService: ConfigService,
    private readonly accountService: AccountService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('app.secretKey'),
    });
  }

  async validate(payload: IJwtPayload, done: VerifiedCallback) {
    if (payload.type !== TokenType.ACCESS)
      return done(new UnauthorizedException());
    return this.accountService.findByPk(+payload.sub);
  }
}
