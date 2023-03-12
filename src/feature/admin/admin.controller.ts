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
  Query,
  UseFilters,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Permissions, Roles } from 'src/authentication/decorator';
import { DefaultQueryDto } from 'src/common/dto';
import { KeywordQueryDto } from 'src/common/dto/keyword-query.dto';
import { AccountType, PermissionEnum } from 'src/common/enum';
import {
  ResponseSuccessInterceptor,
  PaginateResponseInterceptor,
} from 'src/common/interceptor';
import {
  NotFoundExceptionFilter,
  UniqueExceptionFilter,
} from '../../common/filter';
import { AdminService } from './admin.service';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';

@ApiTags('Admin Management')
@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiOperation({ summary: 'Store Admin' })
  @ApiResponse({ status: 201 })
  @ApiBearerAuth()
  @Roles(AccountType.ADMIN)
  @Permissions(PermissionEnum.ADMIN_CREATE)
  @UseFilters(NotFoundExceptionFilter)
  @UseFilters(
    new UniqueExceptionFilter(
      'email, username or phone number Already Exists',
      HttpStatus.BAD_REQUEST,
    ),
  )
  @UseInterceptors(
    new ResponseSuccessInterceptor(HttpStatus.CREATED, 'success create admin'),
  )
  @Post()
  create(@Body() createAdminDto: CreateAdminDto) {
    return this.adminService.create(createAdminDto);
  }

  @ApiOperation({ summary: 'Collection Admin' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @Roles(AccountType.ADMIN)
  @Permissions(PermissionEnum.ADMIN_READ)
  @UseInterceptors(
    new PaginateResponseInterceptor(HttpStatus.OK, 'success get list admin'),
  )
  @Get()
  findAll(@Query() keyword: KeywordQueryDto, @Query() query: DefaultQueryDto) {
    console.log(query);
    return this.adminService.findAll(keyword, query);
  }

  @ApiOperation({ summary: 'Detail Admin' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @Roles(AccountType.ADMIN)
  @Permissions(PermissionEnum.ADMIN_READ)
  @UseFilters(NotFoundExceptionFilter)
  @UseInterceptors(
    new ResponseSuccessInterceptor(HttpStatus.OK, 'success get admin'),
  )
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adminService.findOne(id);
  }

  @ApiOperation({ summary: 'Update Admin' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @Roles(AccountType.ADMIN)
  @Permissions(PermissionEnum.ADMIN_UPDATE)
  @UseFilters(NotFoundExceptionFilter)
  @UseFilters(
    new UniqueExceptionFilter(
      'email, username or phone number Already Exists',
      HttpStatus.BAD_REQUEST,
    ),
  )
  @UseInterceptors(
    new ResponseSuccessInterceptor(HttpStatus.OK, 'success update admin'),
  )
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdminDto: UpdateAdminDto) {
    return this.adminService.update(id, updateAdminDto);
  }

  @ApiOperation({ summary: 'Delete Admin' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @Roles(AccountType.ADMIN)
  @Permissions(PermissionEnum.ADMIN_DELETE)
  @UseFilters(NotFoundExceptionFilter)
  @UseInterceptors(
    new ResponseSuccessInterceptor(HttpStatus.OK, 'success delete admin'),
  )
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adminService.remove(id);
  }
}
