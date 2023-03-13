import {
  Controller,
  Get,
  HttpStatus,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { MiscService } from './misc.service';
import { PermissionEnum } from '../../common/enum';
import { JwtAuthGuard } from 'src/authentication/guard';
import { ResponseSuccessInterceptor } from 'src/common/interceptor';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { KeywordQueryDto } from 'src/common/dto';
import { StorageService } from 'src/infrastructure/storage/storage.service';
import { UploadDto } from './dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as S3 from 'aws-sdk/clients/s3';

@ApiTags('Misc')
@Controller('misc')
export class MiscController {
  constructor(
    private readonly miscService: MiscService,
    private readonly storageService: StorageService,
  ) {}

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

  @ApiResponse({ description: 'since list' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    new ResponseSuccessInterceptor(HttpStatus.OK, 'success get since'),
  )
  @Get('sinces')
  sinces(@Query() keyword: KeywordQueryDto) {
    return this.miscService.listSince(keyword);
  }

  @ApiOperation({ summary: 'Upload a File' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ description: 'File', type: UploadDto })
  @UseInterceptors(
    FileInterceptor('file', { limits: { fileSize: 10 * 1024 * 1024 } }),
  )
  @UseInterceptors(
    new ResponseSuccessInterceptor(HttpStatus.OK, 'success upload file'),
  )
  @Post('upload')
  async upload(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<S3.ManagedUpload.SendData> {
    return this.storageService.upload(file);
  }
}
