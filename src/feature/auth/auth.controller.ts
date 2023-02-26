import {
  Controller,
  Post,
  UseGuards,
  Request,
  UseInterceptors,
  HttpStatus,
  Get,
  Param,
  Body,
  BadRequestException,
  UsePipes,
  ValidationPipe,
  UseFilters,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard, JwtAuthGuard } from '../../authentication/guard';
import { Account } from '../account/entities/account.entity';
import { LoginDto, RefreshTokenDto, ForgotPasswordDto } from './dto';
import { ResponseSuccessInterceptor } from '../../common/interceptor';
import {
  ApiBearerAuth,
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginResponse, RefreshTokenResponse } from './doc';
import { EventEmit, AccountType } from '../../common/enum';
import { EmitsEvent } from '../../common/decorator';
import { AccountService } from '../account/account.service';
import { NotFoundExceptionFilter } from '../../common/filter';

enum TypeAuthParams {
  'admin' = 'admin',
  'owner' = 'owner',
  'employee' = 'employee',
  'customer' = 'customer',
}

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly accountService: AccountService,
  ) {}

  @ApiOperation({ summary: 'Login' })
  @ApiParam({ name: 'type', enum: TypeAuthParams })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, type: LoginResponse })
  @Post('login/:type(admin|owner|employee|customer)')
  @UseGuards(LocalAuthGuard)
  @UseInterceptors(
    new ResponseSuccessInterceptor(HttpStatus.OK, 'success login'),
  )
  async login(@Param('type') type: TypeAuthParams, @Request() req) {
    const user = req.user as Account;
    return this.authService.generateToken(user);
  }

  @ApiOperation({ summary: 'Who am i' })
  @ApiBearerAuth()
  @Get('me')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(new ResponseSuccessInterceptor(HttpStatus.OK, 'success'))
  async me(@Request() req): Promise<Account> {
    const user = req.user as Account;
    return user;
  }

  @ApiOperation({ summary: 'Refresh token' })
  @ApiBody({ type: RefreshTokenDto })
  @ApiResponse({ status: 200, type: RefreshTokenResponse })
  @Post('refresh-token')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(new ResponseSuccessInterceptor(HttpStatus.OK, 'success'))
  async refreshToken(@Body() { refreshToken }: RefreshTokenDto) {
    const newTokenPair = await this.authService.refreshToken(refreshToken);
    if (!newTokenPair) throw new BadRequestException();
    return newTokenPair;
  }

  @ApiOperation({ summary: 'Request Forget Password' })
  @ApiParam({ name: 'type', enum: TypeAuthParams })
  @ApiResponse({ status: 200 })
  @UseFilters(NotFoundExceptionFilter)
  @EmitsEvent(EventEmit.FORGOT_PASSWORD)
  @Post('forgot-password/:type(admin|owner|employee|customer)')
  @UseInterceptors(new ResponseSuccessInterceptor(HttpStatus.OK, 'success'))
  async recoverPassword(
    @Param('type') type: TypeAuthParams,
    @Body() { username }: ForgotPasswordDto,
  ) {
    return this.accountService.findByUsername(
      username,
      AccountType[type.toUpperCase()],
    );
  }
}
