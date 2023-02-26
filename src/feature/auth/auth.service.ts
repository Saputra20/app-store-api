import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AccountService } from '../account/account.service';
import { JwtService } from '@nestjs/jwt';
import { IAppConfig } from '../../common/config/interface';
import { IJwtPayload } from '../../authentication/interface/jwt-payload.interface';
import { TokenType } from '../../common/enum/token-type.enum';
import { Account } from '../account/entities/account.entity';
import { AccountType } from '../../common/enum';

@Injectable()
export class AuthService {
  private appConfig: IAppConfig;
  constructor(
    private readonly accountService: AccountService,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {
    this.appConfig = this.configService.get<IAppConfig>('app');
  }

  private signToken(
    payload: any,
    type: TokenType,
    expiresIn: string = this.appConfig.accessTokenDuration,
  ): string {
    return this.jwtService.sign(
      {
        ...payload,
        type,
      },
      { expiresIn },
    );
  }

  generateToken(account: Account) {
    const payload: IJwtPayload = {
      sub: account.id,
      iss: this.appConfig.baseUrl,
      scope: ['DEFAULT'],
      accountType: account.type,
    };
    return {
      accessToken: this.signToken(payload, TokenType.ACCESS),
      refreshToken: this.signToken(
        payload,
        TokenType.REFRESH,
        this.appConfig.refreshTokenDuration,
      ),
    };
  }

  async validateRefreshToken(refreshToken: string): Promise<IJwtPayload> {
    const payload = await this.jwtService
      .verifyAsync(refreshToken)
      .catch(() => null);
    delete payload.exp;
    delete payload.iat;
    return payload;
  }

  async refreshToken(token: string) {
    const payload = await this.validateRefreshToken(token);
    return {
      accessToken: this.signToken(payload, TokenType.ACCESS),
      refreshToken: this.signToken(
        payload,
        TokenType.REFRESH,
        this.appConfig.refreshTokenDuration,
      ),
    };
  }

  async authenticate(data: string, type: AccountType): Promise<Account> {
    const account = await this.accountService
      .findByUsernameEmailOrPhoneNumber(data, type)
      .catch(() => null);
    return account;
  }
}
