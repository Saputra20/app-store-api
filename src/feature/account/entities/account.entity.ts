import { Entity, Index, Property, Unique } from '@mikro-orm/core';
import { BaseEntity } from '../../../common/entity';

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
  })
  type!: number;

  @Property({
    type: 'varchar',
  })
  password!: string;

  @Property({
    type: 'boolean',
    default: false,
  })
  isVerified!: boolean;

  @Property({
    type: 'timestamptz',
  })
  lastActive!: Date;
}
