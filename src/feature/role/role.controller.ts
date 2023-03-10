import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseGuards,
  UseInterceptors,
  HttpStatus,
  UseFilters,
  ForbiddenException,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import {
  ApiBearerAuth,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { KeywordQueryDto } from 'src/common/dto/keyword-query.dto';
import { DefaultQueryDto } from 'src/common/dto';
import { JwtAuthGuard } from 'src/authentication/guard';
import {
  PaginateResponseInterceptor,
  ResponseSuccessInterceptor,
} from 'src/common/interceptor';
import {
  NotFoundExceptionFilter,
  UniqueExceptionFilter,
} from 'src/common/filter';
import { AdminService } from '../admin/admin.service';
import { PermissionEnum } from '../../common/enum';
import { Permissions } from 'src/authentication/decorator';

@ApiTags('Role Management')
@Controller('roles')
export class RoleController {
  constructor(
    private readonly roleService: RoleService,
    private readonly adminService: AdminService,
  ) {}

  @ApiProperty({ description: 'Create Role' })
  @ApiResponse({ status: 201 })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Permissions(PermissionEnum.ROLE_CREATE)
  @UseFilters(
    new UniqueExceptionFilter('Role Already Exists', HttpStatus.BAD_REQUEST),
  )
  @UseInterceptors(
    new ResponseSuccessInterceptor(HttpStatus.CREATED, 'success create role'),
  )
  @Post()
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  @ApiProperty({ description: 'Collection Role' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Permissions(PermissionEnum.ROLE_READ)
  @UseInterceptors(
    new PaginateResponseInterceptor(HttpStatus.OK, 'success get list role'),
  )
  @Get()
  findAll(@Query() keyword: KeywordQueryDto, @Query() query: DefaultQueryDto) {
    return this.roleService.findAll(keyword, query);
  }

  @ApiProperty({ description: 'Detail Role' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Permissions(PermissionEnum.ROLE_READ)
  @UseInterceptors(
    new ResponseSuccessInterceptor(HttpStatus.OK, 'success get role'),
  )
  @UseFilters(NotFoundExceptionFilter)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(id);
  }

  @ApiProperty({ description: 'Update Role' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Permissions(PermissionEnum.ROLE_UPDATE)
  @UseInterceptors(
    new ResponseSuccessInterceptor(HttpStatus.OK, 'success update role'),
  )
  @UseFilters(NotFoundExceptionFilter)
  @UseFilters(
    new UniqueExceptionFilter('Role Already Exists', HttpStatus.BAD_REQUEST),
  )
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(id, updateRoleDto);
  }

  @ApiProperty({ description: 'Update Role' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Permissions(PermissionEnum.ROLE_DELETE)
  @UseInterceptors(
    new ResponseSuccessInterceptor(HttpStatus.OK, 'success update role'),
  )
  @UseFilters(NotFoundExceptionFilter)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    const checking = await this.adminService.findByRole(
      await this.roleService.findOne(id),
    );

    if (checking.length !== 0) throw new ForbiddenException('Role cant delete');

    return this.roleService.remove(id);
  }
}
