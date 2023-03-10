import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { DefaultQueryDto, KeywordQueryDto } from 'src/common/dto';
import { generateFindAllQuery, getResultAndPaginate } from 'src/common/helper';
import { Owner } from '../owner/entities/owner.entity';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { Merchant } from './entities/merchant.entity';

@Injectable()
export class MerchantService {
  constructor(
    @InjectRepository(Merchant)
    private readonly merchantRepo: EntityRepository<Merchant>,
    @InjectRepository(Owner)
    private readonly ownerRepo: EntityRepository<Owner>,
  ) {}

  async create(createMerchantDto: CreateMerchantDto) {
    const owner = await this.ownerRepo.findOneOrFail({
      id: createMerchantDto.ownerId,
    });

    const row = this.merchantRepo.create({ ...createMerchantDto, owner });
    await this.merchantRepo.persistAndFlush(row);
    return row;
  }

  findAll({ q }: KeywordQueryDto, query: DefaultQueryDto) {
    let qb = this.merchantRepo.createQueryBuilder();
    qb = generateFindAllQuery(qb, query, undefined, undefined, {
      name: new RegExp(q || '.*', 'gi'),
    });
    return getResultAndPaginate(qb, this.merchantRepo, ['owner']);
  }

  findOne(id: string) {
    return this.merchantRepo.findOneOrFail({ id }, { populate: ['owner'] });
  }

  findByOwner(owner: Owner) {
    return this.merchantRepo.find({ owner });
  }

  async update(id: string, updateMerchantDto: UpdateMerchantDto) {
    const merchant = await this.merchantRepo.findOneOrFail({
      id: id,
    });

    const owner = await this.ownerRepo.findOneOrFail({
      id: updateMerchantDto.ownerId,
    });

    const row = this.merchantRepo.assign(merchant, {
      ...updateMerchantDto,
      owner,
    });
    await this.merchantRepo.persistAndFlush(row);
    return row;
  }

  async remove(id: string) {
    await this.merchantRepo.findOneOrFail({ id });
    return this.merchantRepo.nativeDelete({ id });
  }
}
