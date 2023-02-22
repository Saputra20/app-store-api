import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../../feature/auth/auth.service';
import { compareHash } from '../../common/utils';
import { AccountType } from '../../common/enum';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      passReqToCallback: true,
    });
  }

  async validate(request: any, data: string, password: string) {
    const type: string = request.params.type;
    const account = await this.authService.authenticate(
      data,
      AccountType[type.toUpperCase()],
    );
    if (!account) throw new UnauthorizedException('Account not registered');
    if (!(await compareHash(password, account.password)))
      throw new UnauthorizedException('Incorrect account or password');
    return account;
  }
}
