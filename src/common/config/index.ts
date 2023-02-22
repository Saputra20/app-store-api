import { IAppConfig, IDatabaseConfig } from './interface';

export default () => {
  const {
    APP_PORT,
    APP_BASE_URL,
    APP_SECRET_KEY,
    APP_ACCESS_TOKEN_DURATION,
    APP_REFRESH_TOKEN_DURATION,
    DATABASE_USER,
    DATABASE_PASSWORD,
    DATABASE_HOST,
    DATABASE_PORT,
    DATABASE_NAME,
    DATABASE_DIALECT,
  } = process.env;

  return {
    database: <IDatabaseConfig>{
      user: DATABASE_USER,
      password: DATABASE_PASSWORD,
      host: DATABASE_HOST,
      port: parseInt(DATABASE_PORT),
      name: DATABASE_NAME,
      dialect: DATABASE_DIALECT,
    },
    app: <IAppConfig>{
      baseUrl: APP_BASE_URL,
      secretKey: APP_SECRET_KEY,
      accessTokenDuration: APP_ACCESS_TOKEN_DURATION,
      refreshTokenDuration: APP_REFRESH_TOKEN_DURATION,
      port: +APP_PORT || 3000,
    },
  };
};
