import {
  Controller,
  Get,
  HttpStatus,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MiscService } from './misc.service';
import { PermissionEnum } from '../../common/enum';
import { JwtAuthGuard } from 'src/authentication/guard';
import { ResponseSuccessInterceptor } from 'src/common/interceptor';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Misc')
@Controller('misc')
export class MiscController {
  constructor(private readonly miscService: MiscService) {}

  @ApiResponse({ description: 'permission list' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    new ResponseSuccessInterceptor(
      HttpStatus.OK,
      'success get list permission',
    ),
  )
  @Get('permissions')
  permissions() {
    return Object.values(PermissionEnum);
  }
}
