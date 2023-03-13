import {
  IAppConfig,
  IDatabaseConfig,
  IRedisConfig,
  IS3Config,
} from './interface';

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
    S3_ACCESS_KEY,
    S3_SECRET_KEY,
    S3_ENDPOINT,
    S3_BUCKET,
    S3_ROOT,
    REDIS_PORT,
    REDIS_HOST,
    REDIS_PASSWORD,
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
    storage: <IS3Config>{
      accessKey: S3_ACCESS_KEY,
      secretKey: S3_SECRET_KEY,
      endpoint: S3_ENDPOINT,
      bucket: S3_BUCKET,
      root: S3_ROOT,
    },
    redis: <IRedisConfig>{
      port: parseInt(REDIS_PORT),
      host: REDIS_HOST,
      password: REDIS_PASSWORD,
    },
  };
};
