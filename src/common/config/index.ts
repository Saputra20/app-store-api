import { IAppConfig, IDatabaseConfig } from './interface';

export default () => {
  const {
    APP_PORT,
    APP_BASE_URL,
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
      port: +APP_PORT || 3000,
    },
  };
};
