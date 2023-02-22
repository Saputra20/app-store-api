import { IsNotEmpty, Length } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  phoneNumber: string;

  @Length(8)
  password: string;

  @IsNotEmpty()
  type: number;
}
