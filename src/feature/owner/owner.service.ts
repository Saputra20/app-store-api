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
import { CreateOwnerDto } from './dto/create-owner.dto';
import { UpdateOwnerDto } from './dto/update-owner.dto';
import { Owner } from './entities/owner.entity';

@Injectable()
export class OwnerService {
  constructor(
    @InjectRepository(Owner)
    private readonly ownerRepo: EntityRepository<Owner>,
    @InjectRepository(Account)
    private readonly accountRepo: EntityRepository<Account>,
  ) {}

  async create(createOwnerDto: CreateOwnerDto) {
    const { email, phoneNumber, password, username } = createOwnerDto;
    const row = this.ownerRepo.create({
      ...createOwnerDto,
      account: {
        email,
        phoneNumber,
        password,
        username,
        type: AccountType.OWNER,
      },
    });
    await this.ownerRepo.persistAndFlush(row);
    return row;
  }

  findAll({ q }: KeywordQueryDto, query: DefaultQueryDto) {
    let qb = this.ownerRepo.createQueryBuilder('owner');
    qb.select([
      'owner.*',
      'accounts.email',
      'accounts.username',
      'accounts.phone_number as phoneNumber',
    ]);
    qb.join('owner.account', 'accounts');

    qb = generateFindAllQuery(qb, query, undefined, undefined, {
      fullname: new RegExp(q || '.*', 'gi'),
    });

    return getResultQueryAndPaginate(qb);
  }

  findOne(id: string) {
    return this.ownerRepo.findOneOrFail({ id }, { populate: ['account'] });
  }

  async update(id: string, updateOwnerDto: UpdateOwnerDto) {
    const owner = await this.ownerRepo.findOneOrFail(
      { id },
      { populate: ['account'] },
    );

    const account = this.accountRepo.assign(owner.account, updateOwnerDto);
    const row = this.ownerRepo.assign(owner, {
      ...updateOwnerDto,
      account,
    });
    await this.ownerRepo.persistAndFlush(row);
    return row;
  }

  async remove(id: string) {
    const owner = await this.ownerRepo.findOneOrFail({ id });
    return this.ownerRepo.nativeDelete({ id }).then((res) => {
      if (res) {
        this.accountRepo.nativeDelete({ id: owner.account.id });
      }
      return res;
    });
  }
}
