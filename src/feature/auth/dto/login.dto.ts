import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'dev' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ example: 'p@ssword123' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
