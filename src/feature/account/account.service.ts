import { Injectable } from '@nestjs/common';
import { Account } from './entities/account.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { LoadStrategy, RequiredEntityData } from '@mikro-orm/core';
import { hash } from '../../common/utils';
import { AccountType } from '../../common/enum';

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepo: EntityRepository<Account>,
  ) {}

  findByUsernameEmailOrPhoneNumber(
    data: string,
    type: AccountType,
  ): Promise<Account> {
    return this.accountRepo.findOneOrFail(
      {
        $and: [
          {
            $or: [
              {
                email: data,
              },
              {
                username: data,
              },
              {
                phoneNumber: data,
              },
            ],
          },
          {
            type,
          },
        ],
      },
      {
        fields: [
          'id',
          'email',
          'username',
          'password',
          'phoneNumber',
          'type',
          'isVerified',
          'createdAt',
          'updatedAt',
        ],
      },
    );
  }

  async findByPk(id: string, type: number): Promise<Account> {
    const qb = this.accountRepo.createQueryBuilder('account');
    qb.select([
      'account.id',
      'account.email',
      'account.username',
      'account.phoneNumber',
      'account.isVerified',
      'account.lastActive',
    ]);

    switch (type) {
      case AccountType.ADMIN:
        qb.joinAndSelect('account.admin', 'admins');
        qb.joinAndSelect('admins.role', 'roles');
        break;
      case AccountType.OWNER:
        qb.join('account.owner', 'owners');
        break;
      case AccountType.CUSTOMER:
        qb.join('account.customer', 'customers');
        break;
      case AccountType.EMPLOYEE:
        qb.join('account.employee', 'employees');
        break;
    }

    return qb.where({ id }).execute();
  }

  async create(
    data: RequiredEntityData<Account>,
    isVerified = false,
  ): Promise<Account> {
    data.password = await hash(data.password);
    const account = this.accountRepo.create({ ...data, isVerified });
    await this.accountRepo.persistAndFlush(account);
    return account;
  }

  async findByUsername(username: string, type: any): Promise<Account> {
    return this.accountRepo.findOneOrFail({ username, type });
  }
}
