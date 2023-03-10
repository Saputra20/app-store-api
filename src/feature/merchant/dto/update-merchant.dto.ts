import { ApiProperty } from '@nestjs/swagger';
import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class UpdateMerchantDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsLatitude()
  lat: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsLongitude()
  long: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsPhoneNumber('ID')
  phoneNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  since: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  photo: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  ownerId: string;
}
