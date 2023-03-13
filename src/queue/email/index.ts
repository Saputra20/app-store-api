import { Job } from 'bull';
import createQueue from '../';

const mailQueue = createQueue('Mail');
mailQueue.process(function (job: Job) {
  console.log(job);
});

export default mailQueue;
