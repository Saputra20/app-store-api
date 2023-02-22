import {
  Controller,
  Post,
  UseGuards,
  Request,
  Body,
  UseInterceptors,
  HttpStatus,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from '../../authentication/guard';
import { Account } from '../account/entities/account.entity';
import { RegisterDto } from './dto';
import { ResponseSuccessInterceptor } from '../../common/interceptor';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/:type(admin|owner|employee|customer)')
  @UseGuards(LocalAuthGuard)
  @UseInterceptors(
    new ResponseSuccessInterceptor(HttpStatus.OK, 'success login'),
  )
  async login(@Request() req) {
    const user = req.user as Account;

    return this.authService.generateToken(user);
  }

  @Post('register')
  @UseInterceptors(
    new ResponseSuccessInterceptor(HttpStatus.CREATED, 'success register'),
  )
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }
}
