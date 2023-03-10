import {
  Controller,
  ForbiddenException,
  Get,
  HttpStatus,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/authentication/guard';
import { ResponseSuccessInterceptor } from 'src/common/interceptor';
import { Account } from '../account/entities/account.entity';
import { MeService } from './me.service';
import { Menu } from '../../common/constant';

@Controller('me')
export class MeController {
  constructor(private readonly meService: MeService) {}

  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    new ResponseSuccessInterceptor(HttpStatus.OK, 'success get menu'),
  )
  @Get('menus')
  menu(@Req() req) {
    const user = req.user as Account;
    if (!user.admin) throw new ForbiddenException();
    if (!user.admin.role) throw new ForbiddenException();

    return Menu.filter(
      (d) => user.admin.role.permissions.includes(d.key) || !d.key,
    );
  }
}
