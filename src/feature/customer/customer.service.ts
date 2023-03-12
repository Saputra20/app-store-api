import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { DefaultQueryDto, KeywordQueryDto } from 'src/common/dto';
import { AccountType } from 'src/common/enum';
import {
  generateFindAllQuery,
  getResultQueryAndPaginate,
} from 'src/common/helper';
import { Account } from '../account/entities/account.entity';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(Customer)
    private readonly customerRepo: EntityRepository<Customer>,
    @InjectRepository(Account)
    private readonly accountRepo: EntityRepository<Account>,
  ) {}

  async create(createCustomerDto: CreateCustomerDto) {
    const { email, phoneNumber, password, username } = createCustomerDto;
    const row = this.customerRepo.create({
      ...createCustomerDto,
      account: {
        email,
        phoneNumber,
        password,
        username,
        type: AccountType.CUSTOMER,
        isVerified: true,
      },
    });
    await this.customerRepo.persistAndFlush(row);
    return row;
  }

  findAll({ q }: KeywordQueryDto, query: DefaultQueryDto) {
    let qb = this.customerRepo.createQueryBuilder('customer');
    qb.select([
      'customer.*',
      'accounts.email',
      'accounts.username',
      'accounts.phone_number as phoneNumber',
    ]);
    qb.join('customer.account', 'accounts');

    qb = generateFindAllQuery(qb, query, undefined, undefined, {
      fullname: new RegExp(q || '.*', 'gi'),
    });
    return getResultQueryAndPaginate(qb);
  }

  findOne(id: string) {
    return this.customerRepo.findOneOrFail({ id }, { populate: ['account'] });
  }

  async update(id: string, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.customerRepo.findOneOrFail(
      { id },
      { populate: ['account'] },
    );

    const account = this.accountRepo.assign(
      customer.account,
      updateCustomerDto,
    );
    const row = this.customerRepo.assign(customer, {
      ...updateCustomerDto,
      account,
    });
    await this.customerRepo.persistAndFlush(row);
    return row;
  }

  async remove(id: string) {
    const customer = await this.customerRepo.findOneOrFail({ id });
    return this.customerRepo.nativeDelete({ id }).then((res) => {
      if (res) {
        this.accountRepo.nativeDelete({ id: customer.account.id });
      }
      return res;
    });
  }
}
