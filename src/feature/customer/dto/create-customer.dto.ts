import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';
import { genderEnum } from 'src/feature/owner/enum';

export class CreateCustomerDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber('ID')
  phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  fullname: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  photo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  bod: string;

  @ApiProperty({ enum: genderEnum })
  @IsNotEmpty()
  @IsEnum(genderEnum)
  gender: genderEnum;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  address: string;
}
