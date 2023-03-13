import { Module } from '@nestjs/common';
import { MiscService } from './misc.service';
import { MiscController } from './misc.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Since } from '../since/entities/since.entity';

@Module({
  imports: [MikroOrmModule.forFeature([Since])],
  controllers: [MiscController],
  providers: [MiscService],
})
export class MiscModule {}
