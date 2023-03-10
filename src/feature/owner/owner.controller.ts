import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UseInterceptors,
  HttpStatus,
  Query,
  UseFilters,
  ForbiddenException,
} from '@nestjs/common';
import { OwnerService } from './owner.service';
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import {
  ApiBearerAuth,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/authentication/guard';
import {
  PaginateResponseInterceptor,
  ResponseSuccessInterceptor,
} from 'src/common/interceptor';
import { DefaultQueryDto, KeywordQueryDto } from 'src/common/dto';
import {
  NotFoundExceptionFilter,
  UniqueExceptionFilter,
} from 'src/common/filter';
import { MerchantService } from '../merchant/merchant.service';

@ApiTags('Owner Management')
@Controller('owners')
export class OwnerController {
  constructor(
    private readonly ownerService: OwnerService,
    private readonly merchantService: MerchantService,
  ) {}

  @ApiProperty({ description: 'Store Owner' })
  @ApiResponse({ status: 201 })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseFilters(
    new UniqueExceptionFilter(
      'email, username or phone number Already Exists',
      HttpStatus.BAD_REQUEST,
    ),
  )
  @UseInterceptors(
    new ResponseSuccessInterceptor(HttpStatus.CREATED, 'success create owner'),
  )
  @Post()
  create(@Body() createOwnerDto: CreateOwnerDto) {
    return this.ownerService.create(createOwnerDto);
  }

  @ApiProperty({ description: 'Collection Owner' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    new PaginateResponseInterceptor(HttpStatus.OK, 'success get list owner'),
  )
  @Get()
  findAll(@Query() keyword: KeywordQueryDto, @Query() query: DefaultQueryDto) {
    return this.ownerService.findAll(keyword, query);
  }

  @ApiProperty({ description: 'Detail Owner' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseFilters(NotFoundExceptionFilter)
  @UseInterceptors(
    new ResponseSuccessInterceptor(HttpStatus.OK, 'success get owner'),
  )
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.ownerService.findOne(id);
  }

  @ApiProperty({ description: 'Update Owner' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseFilters(NotFoundExceptionFilter)
  @UseFilters(
    new UniqueExceptionFilter(
      'email, username or phone number Already Exists',
      HttpStatus.BAD_REQUEST,
    ),
  )
  @UseInterceptors(
    new ResponseSuccessInterceptor(HttpStatus.OK, 'success update owner'),
  )
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOwnerDto: UpdateOwnerDto) {
    return this.ownerService.update(id, updateOwnerDto);
  }

  @ApiProperty({ description: 'Delete Owner' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseFilters(NotFoundExceptionFilter)
  @UseInterceptors(
    new ResponseSuccessInterceptor(HttpStatus.OK, 'success delete owner'),
  )
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const checking = await this.merchantService.findByOwner(
      await this.ownerService.findOne(id),
    );

    if (checking.length !== 0)
      throw new ForbiddenException('owner cant delete');

    return this.ownerService.remove(id);
  }
}
