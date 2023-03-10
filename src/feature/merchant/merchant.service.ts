import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { Owner } from '../owner/entities/owner.entity';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { UpdateMerchantDto } from './dto/update-merchant.dto';
import { Merchant } from './entities/merchant.entity';

@Injectable()
export class MerchantService {
  constructor(
    @InjectRepository(Merchant)
    private readonly merchantRepo: EntityRepository<Merchant>,
  ) {}

  create(createMerchantDto: CreateMerchantDto) {
    return 'This action adds a new merchant';
  }

  findAll() {
    return `This action returns all merchant`;
  }

  findOne(id: number) {
    return `This action returns a #${id} merchant`;
  }

  findByOwner(owner: Owner) {
    return this.merchantRepo.find({ owner });
  }

  update(id: number, updateMerchantDto: UpdateMerchantDto) {
    return `This action updates a #${id} merchant`;
  }

  remove(id: number) {
    return `This action removes a #${id} merchant`;
  }
}
