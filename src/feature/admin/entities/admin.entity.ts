import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../../common/entity';
import { Role } from '../../role/entities/role.entity';
import { Account } from '../../account/entities/account.entity';

@Entity({
  tableName: 'admins',
})
export class Admin extends BaseEntity {
  @Property({
    type: 'varchar',
  })
  fullname!: string;

  @Property({
    type: 'varchar',
  })
  photo: string;

  @ManyToOne(() => Role)
  role: Role;

  @ManyToOne(() => Account)
  account: Account;
}
