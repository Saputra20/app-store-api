import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { EmailProcessor } from './email.processor';
import { EmailService } from './email.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'email',
    }),
  ],
  providers: [EmailProcessor, EmailService],
})
export class EmailModule {}
