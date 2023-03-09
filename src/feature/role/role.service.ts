import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { DefaultQueryDto, KeywordQueryDto } from '../../common/dto';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';
import {
  generateFindAllQuery,
  getResultQueryAndPaginate,
} from '../../common/helper';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepo: EntityRepository<Role>,
  ) {}

  async create(createRoleDto: CreateRoleDto) {
    const row = this.roleRepo.create(createRoleDto);
    await this.roleRepo.persistAndFlush(row);
    return row;
  }

  findAll({ q }: KeywordQueryDto, query: DefaultQueryDto) {
    let qb = this.roleRepo.createQueryBuilder();
    qb.select('*');

    qb = generateFindAllQuery(qb, query, undefined, undefined, {
      name: new RegExp(q || '.*', 'gi'),
    });

    return getResultQueryAndPaginate(qb);
  }

  findOne(id: string) {
    return this.roleRepo.findOneOrFail({ id });
  }

  async update(id: string, updateRoleDto: UpdateRoleDto) {
    const data = await this.roleRepo.findOneOrFail({ id });
    const row = this.roleRepo.assign(data, updateRoleDto);
    await this.roleRepo.persistAndFlush(row);
    return row;
  }

  remove(id: string) {
    return this.roleRepo.nativeDelete(id);
  }
}
