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
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/authentication/guard';
import { DefaultQueryDto } from 'src/common/dto';
import { KeywordQueryDto } from 'src/common/dto/keyword-query.dto';
import {
  ResponseSuccessInterceptor,
  PaginateResponseInterceptor,
} from 'src/common/interceptor';
import { NotFoundExceptionFilter } from '../../common/filter';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@ApiTags('Admin Management')
@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @ApiOperation({ summary: 'Collection Admin' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  @UseInterceptors(
    new PaginateResponseInterceptor(HttpStatus.OK, 'success get list admin'),
  )
  findAll(@Query() keyword: KeywordQueryDto, @Query() query: DefaultQueryDto) {
    console.log(query);
    return this.adminService.findAll(keyword, query);
  }

  @ApiOperation({ summary: 'Detail Admin' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @UseFilters(NotFoundExceptionFilter)
  @UseInterceptors(
    new ResponseSuccessInterceptor(HttpStatus.OK, 'success get admin'),
  )
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(+id, updateAdminDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(+id);
  }
}
