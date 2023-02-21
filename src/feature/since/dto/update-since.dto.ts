import { PartialType } from '@nestjs/mapped-types';
import { CreateSinceDto } from './create-since.dto';

export class UpdateSinceDto extends PartialType(CreateSinceDto) {}
