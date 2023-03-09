import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { DefaultQueryDto } from 'src/common/dto';
import { KeywordQueryDto } from 'src/common/dto/keyword-query.dto';
import {
  generateFindAllQuery,
  getResultQueryAndPaginate,
} from 'src/common/helper';
import { Role } from '../role/entities/role.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepo: EntityRepository<Admin>,
  ) {}

  create(createAdminDto: CreateAdminDto) {
    return 'This action adds a new admin';
  }

  findAll({ q }: KeywordQueryDto, query: DefaultQueryDto) {
    let qb = this.adminRepo.createQueryBuilder('admin');
    qb.select('*');
    qb.addSelect([
      'accounts.email',
      'accounts.phoneNumber',
      'accounts.username',
      'roles.name',
    ]);
    qb.join('admin.account', 'accounts');
    qb.join('admin.role', 'roles');

    qb = generateFindAllQuery(qb, query, undefined, undefined, {
      fullname: new RegExp(q || '.*', 'gi'),
    });

    return getResultQueryAndPaginate(qb);
  }

  findOne(id: string) {
    return this.adminRepo.findOneOrFail(
      { id },
      { populate: ['account', 'role'] },
    );
  }

  findByRole(role: Role) {
    return this.adminRepo.find({ role });
  }

  update(id: number, updateAdminDto: UpdateAdminDto) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }
}
