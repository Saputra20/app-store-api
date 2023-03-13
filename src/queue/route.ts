import * as express from 'express';
import { ExpressAdapter } from '@bull-board/express';
import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import emailQueue from './email';
import { Queue } from 'bull';

const router = express.Router();
const adapter = new ExpressAdapter();
const queues: Queue[] = [emailQueue];

createBullBoard({
  queues: queues.map((q) => new BullAdapter(q)),
  serverAdapter: adapter,
});

adapter.setBasePath('/queue-monitor');
router.use('/', adapter.getRouter());

export default router;
