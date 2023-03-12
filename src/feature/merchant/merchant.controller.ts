import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  HttpStatus,
  UseFilters,
  Query,
} from '@nestjs/common';
import { MerchantService } from './merchant.service';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import {
  ApiBearerAuth,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  PaginateResponseInterceptor,
  ResponseSuccessInterceptor,
} from 'src/common/interceptor';
import { Permissions, Roles } from '../../authentication/decorator';
import { PermissionEnum, AccountType } from 'src/common/enum';
import {
  NotFoundExceptionFilter,
  UniqueExceptionFilter,
} from 'src/common/filter';
import { DefaultQueryDto, KeywordQueryDto } from 'src/common/dto';

@ApiTags('Merchant Management')
@Controller('merchants')
export class MerchantController {
  constructor(private readonly merchantService: MerchantService) {}

  @ApiProperty({ description: 'Store Merchant' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @Roles(AccountType.ADMIN)
  @Permissions(PermissionEnum.MERCHANT_CREATE)
  @UseFilters(NotFoundExceptionFilter)
  @UseFilters(
    new UniqueExceptionFilter(
      'Merchant already exists',
      HttpStatus.BAD_REQUEST,
    ),
  )
  @UseInterceptors(
    new ResponseSuccessInterceptor(
      HttpStatus.CREATED,
      'success create merchant',
    ),
  )
  @Post()
  create(@Body() createMerchantDto: CreateMerchantDto) {
    return this.merchantService.create(createMerchantDto);
  }

  @ApiProperty({ description: 'Collection Merchant' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @Roles(AccountType.ADMIN)
  @Permissions(PermissionEnum.MERCHANT_READ)
  @UseInterceptors(
    new PaginateResponseInterceptor(HttpStatus.OK, 'success get list merchant'),
  )
  @Get()
  findAll(@Query() keyword: KeywordQueryDto, @Query() query: DefaultQueryDto) {
    return this.merchantService.findAll(keyword, query);
  }

  @ApiProperty({ description: 'Detail Merchant' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @Roles(AccountType.ADMIN)
  @Permissions(PermissionEnum.MERCHANT_READ)
  @UseFilters(NotFoundExceptionFilter)
  @UseInterceptors(
    new ResponseSuccessInterceptor(HttpStatus.OK, 'success get merchant'),
  )
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.merchantService.findOne(id);
  }

  @ApiProperty({ description: 'Update Merchant' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @Roles(AccountType.ADMIN)
  @Permissions(PermissionEnum.MERCHANT_UPDATE)
  @UseFilters(NotFoundExceptionFilter)
  @UseFilters(
    new UniqueExceptionFilter(
      'Merchant already exists',
      HttpStatus.BAD_REQUEST,
    ),
  )
  @UseInterceptors(
    new ResponseSuccessInterceptor(HttpStatus.OK, 'success update merchant'),
  )
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMerchantDto: UpdateMerchantDto,
  ) {
    return this.merchantService.update(id, updateMerchantDto);
  }

  @ApiProperty({ description: 'Delete Merchant' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @Roles(AccountType.ADMIN)
  @Permissions(PermissionEnum.MERCHANT_DELETE)
  @UseFilters(NotFoundExceptionFilter)
  @UseInterceptors(
    new ResponseSuccessInterceptor(HttpStatus.OK, 'success delete merchant'),
  )
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.merchantService.remove(id);
  }
}
