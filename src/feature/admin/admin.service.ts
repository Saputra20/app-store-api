import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityRepository } from '@mikro-orm/postgresql';
import { Injectable } from '@nestjs/common';
import { DefaultQueryDto } from 'src/common/dto';
import { KeywordQueryDto } from 'src/common/dto/keyword-query.dto';
import {
  generateFindAllQuery,
  getResultQueryAndPaginate,
} from 'src/common/helper';
import { Account } from '../account/entities/account.entity';
import { Role } from '../role/entities/role.entity';
import { CreateAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepo: EntityRepository<Admin>,
    @InjectRepository(Role)
    private readonly roleRepo: EntityRepository<Role>,
    @InjectRepository(Account)
    private readonly accountRepo: EntityRepository<Account>,
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    const { email, username, phoneNumber, password, fullname, photo, roleId } =
      createAdminDto;
    const role = await this.roleRepo.findOneOrFail({
      id: roleId,
    });

    const account = this.accountRepo.create({
      email,
      username,
      phoneNumber,
      password,
      type: 1,
      isVerified: true,
    });

    const row = this.adminRepo.create({ fullname, photo, role, account });
    await this.adminRepo.persistAndFlush(row);
    return row;
  }

  findAll({ q }: KeywordQueryDto, query: DefaultQueryDto) {
    let qb = this.adminRepo.createQueryBuilder('admin');
    qb.select('*');
    qb.addSelect([
      'accounts.email',
      'accounts.phone_number as phoneNumber',
      'accounts.username',
      'roles.name as  roleName',
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

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    const admin = await this.adminRepo.findOneOrFail(
      { id },
      { populate: ['account'] },
    );

    // find role
    const role = await this.roleRepo.findOneOrFail({
      id: updateAdminDto.roleId,
    });

    // update association account
    const account = this.accountRepo.assign(admin.account, updateAdminDto);

    // update data admin with association
    const row = this.adminRepo.assign(admin, {
      role,
      account,
      ...updateAdminDto,
    });

    await this.adminRepo.persistAndFlush(row);
    return row;
  }

  async remove(id: string) {
    const admin = await this.adminRepo.findOneOrFail({ id });
    return this.adminRepo.nativeDelete({ id }).then(async (res) => {
      if (res) {
        await this.accountRepo.nativeDelete({ id: admin.account.id });
      }
      return res;
    });
  }
}
