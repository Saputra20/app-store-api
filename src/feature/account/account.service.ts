import { Injectable } from '@nestjs/common';
import { Account } from './entities/account.entity';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { RequiredEntityData } from '@mikro-orm/core';
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

  findByPk(id: number): Promise<Account> {
    return this.accountRepo.findOneOrFail({ id });
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
}
