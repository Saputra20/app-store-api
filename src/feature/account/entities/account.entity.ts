import {
  Cascade,
  Entity,
  Index,
  OneToOne,
  Property,
  Unique,
} from '@mikro-orm/core';
import { BaseEntity } from '../../../common/entity';
import { AccountTypeName } from '../../../common/enum';
import { Owner } from '../../owner/entities/owner.entity';
import { Admin } from '../../admin/entities/admin.entity';
import { Employee } from '../../employee/entities/employee.entity';
import { Customer } from '../../customer/entities/customer.entity';

@Entity({
  tableName: 'accounts',
})
export class Account extends BaseEntity {
  @Property({
    type: 'varchar',
  })
  @Unique()
  @Index()
  username!: string;

  @Property({
    type: 'varchar',
  })
  @Unique()
  @Index()
  email!: string;

  @Property({
    type: 'varchar',
  })
  @Unique()
  @Index()
  phoneNumber!: string;

  @Property({
    type: 'int',
    comment: '1: admin, 2: owner, 3: employee, 4: customer',
    hidden: true,
  })
  type!: number;

  @Property({
    persist: false,
  })
  get typeName() {
    return AccountTypeName[`_${this.type}`];
  }

  @Property({
    type: 'varchar',
    hidden: true,
  })
  password!: string;

  @Property({
    type: 'boolean',
    default: false,
  })
  isVerified!: boolean;

  @Property({
    type: 'timestamptz',
    nullable: true,
  })
  lastActive!: Date;

  @OneToOne(() => Owner, (owner) => owner.account, { cascade: [Cascade.ALL] })
  owner?: Owner;

  @OneToOne(() => Admin, (admin) => admin.account, { cascade: [Cascade.ALL] })
  admin?: Admin;

  @OneToOne(() => Employee, (employee) => employee.account, {
    cascade: [Cascade.ALL],
  })
  employee?: Employee;

  @OneToOne(() => Customer, (customer) => customer.account, {
    cascade: [Cascade.ALL],
  })
  customer?: Customer;
}
