import { Module } from '@nestjs/common';
import { SinceService } from './since.service';
import { SinceController } from './since.controller';

@Module({
  controllers: [SinceController],
  providers: [SinceService]
})
export class SinceModule {}
