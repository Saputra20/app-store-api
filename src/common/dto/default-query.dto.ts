import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class DefaultQueryDto {
  @ApiProperty({ description: 'nth-Page' })
  @IsPositive()
  @Type(() => Number)
  page?: number = 1;

  @ApiProperty({ description: 'Limit pagination' })
  @IsPositive()
  @IsNumber()
  @Type(() => Number)
  limit?: number = 10;

  @ApiProperty({
    description: 'Ordering data. format: <[field]>.<asc|desc>',
    required: false,
  })
  @IsString()
  @IsOptional()
  order?: string = 'createdAt.desc';
  get orderBy() {
    const rows = this.order.split('.');

    if (rows.length === 2) {
      const [field, mode] = rows;
      return { [field]: mode };
    } else {
      const [table, field, mode] = rows;
      return { [table]: { [field]: mode } };
    }
  }

  get offset(): number {
    return (this.page - 1) * this.limit;
  }
}
