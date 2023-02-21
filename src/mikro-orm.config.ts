import { MikroOrmModuleSyncOptions } from '@mikro-orm/nestjs';
import config from './common/config';

export default function () {
  const db = config().database;
  return <MikroOrmModuleSyncOptions>{
    registerRequestContext: false,
    dbName: db.name,
    migrations: {
      path: 'dist/database/migration',
      pathTs: 'src/database/migration',
    },
    seeder: {
      path: 'dist/database/seeder',
      pathTs: 'src/database/seeder',
    },
    user: db.user,
    password: db.password,
    host: db.host,
    port: db.port,
    type: db.dialect,
    entities: ['dist/feature/**/entities/*.entity.js'],
    entitiesTs: ['src/feature/**/entities/*.entity.ts'],
  };
}
