import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class KeywordQueryDto {
  @ApiProperty({ description: 'Search keyword', required: false })
  @IsOptional()
  q?: string;
}
