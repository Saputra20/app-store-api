export interface IAppConfig {
  baseUrl: string;
  secretKey: string;
  accessTokenDuration: string;
  refreshTokenDuration: string;
  port?: number;
}
