import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { PermissionEnum } from 'src/common/enum';

export class CreateRoleDto {
  @ApiProperty({ description: 'name role' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: 'type role' })
  @IsNotEmpty()
  @IsNumber()
  type: number;

  @ApiProperty({ description: 'permission role' })
  @IsArray()
  @IsOptional()
  permissions?: any[] = [PermissionEnum.ALL];
}
