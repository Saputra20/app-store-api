import * as Queue from 'bull';

const redisOptions = {
  redis: {
    port: parseInt(process.env.REDIS_PORT),
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
  },
};

const createQueue = (name: string) => new Queue(`APP.${name}`, redisOptions);

export default createQueue;
