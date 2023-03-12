import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  HttpStatus,
  UseFilters,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Permissions, Roles } from 'src/authentication/decorator';
import { DefaultQueryDto, KeywordQueryDto } from 'src/common/dto';
import { AccountType, PermissionEnum } from 'src/common/enum';
import {
  NotFoundExceptionFilter,
  UniqueExceptionFilter,
} from 'src/common/filter';
import {
  PaginateResponseInterceptor,
  ResponseSuccessInterceptor,
} from 'src/common/interceptor';
import { CustomerService } from './customer.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';

@ApiTags('Customer Management')
@Controller('customers')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}

  @ApiProperty({ description: 'Store Customer' })
  @ApiResponse({ status: 201 })
  @ApiBearerAuth()
  @Roles(AccountType.ADMIN)
  @Permissions(PermissionEnum.CUSTOMER_CREATE)
  @UseFilters(NotFoundExceptionFilter)
  @UseFilters(
    new UniqueExceptionFilter(
      'email, username or phone number Already Exists',
      HttpStatus.BAD_REQUEST,
    ),
  )
  @UseInterceptors(
    new ResponseSuccessInterceptor(
      HttpStatus.CREATED,
      'success create customer',
    ),
  )
  @Post()
  create(@Body() createCustomerDto: CreateCustomerDto) {
    return this.customerService.create(createCustomerDto);
  }

  @ApiProperty({ description: 'Collection Customer' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @Roles(AccountType.ADMIN)
  @Permissions(PermissionEnum.CUSTOMER_READ)
  @UseInterceptors(
    new PaginateResponseInterceptor(HttpStatus.OK, 'success get list customer'),
  )
  @Get()
  findAll(@Query() keyword: KeywordQueryDto, @Query() query: DefaultQueryDto) {
    return this.customerService.findAll(keyword, query);
  }

  @ApiProperty({ description: 'Detail Customer' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @Roles(AccountType.ADMIN)
  @Permissions(PermissionEnum.CUSTOMER_READ)
  @UseFilters(NotFoundExceptionFilter)
  @UseInterceptors(
    new ResponseSuccessInterceptor(HttpStatus.OK, 'success get customer'),
  )
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.customerService.findOne(id);
  }

  @ApiProperty({ description: 'Update Customer' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @Roles(AccountType.ADMIN)
  @Permissions(PermissionEnum.CUSTOMER_UPDATE)
  @UseFilters(NotFoundExceptionFilter)
  @UseFilters(
    new UniqueExceptionFilter(
      'email, username or phone number Already Exists',
      HttpStatus.BAD_REQUEST,
    ),
  )
  @UseInterceptors(
    new ResponseSuccessInterceptor(HttpStatus.OK, 'success update customer'),
  )
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCustomerDto: UpdateCustomerDto,
  ) {
    return this.customerService.update(id, updateCustomerDto);
  }

  @ApiProperty({ description: 'Delete Customer' })
  @ApiResponse({ status: 200 })
  @ApiBearerAuth()
  @Roles(AccountType.ADMIN)
  @Permissions(PermissionEnum.CUSTOMER_DELETE)
  @UseFilters(NotFoundExceptionFilter)
  @UseInterceptors(
    new ResponseSuccessInterceptor(HttpStatus.OK, 'success update customer'),
  )
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.customerService.remove(id);
  }
}
