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
    let populate = null;

    switch (type) {
      case AccountType.ADMIN:
        populate = 'admin';
        break;
      case AccountType.OWNER:
        populate = 'owner';
        break;
      case AccountType.CUSTOMER:
        populate = 'customer';
        break;
      case AccountType.EMPLOYEE:
        populate = 'employee';
        break;
    }

    const user = await this.accountRepo
      .createQueryBuilder()
      .select('*')
      .where({ id })
      .populate([{ strategy: LoadStrategy.JOINED, field: populate }])
      .getSingleResult();

    delete user.password;
    return user;
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
