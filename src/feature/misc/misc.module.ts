import { Module } from '@nestjs/common';
import { MiscService } from './misc.service';
import { MiscController } from './misc.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Since } from '../since/entities/since.entity';
import { StorageModule } from 'src/infrastructure/storage/storage.module';

@Module({
  imports: [MikroOrmModule.forFeature([Since]), StorageModule],
  controllers: [MiscController],
  providers: [MiscService],
})
export class MiscModule {}
