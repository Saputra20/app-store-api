import { TokenType } from '../../common/enum/token-type.enum';

export interface IJwtPayload {
  sub: string | number;
  iss: string;
  accountType: number;
  type?: TokenType;
  scope?: string[];
}
