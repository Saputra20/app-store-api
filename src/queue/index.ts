import * as Queue from 'bull';

const redisOptions = {
  redis: {
    port: 6379,
    host: '127.0.0.1',
    password: '',
  },
};

const createQueue = (name: string) => new Queue(`APP.${name}`, redisOptions);

export default createQueue;
