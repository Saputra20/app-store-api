import { Entity, Index, ManyToOne, OneToOne, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../../common/entity';
import { Account } from '../../account/entities/account.entity';
import { Merchant } from '../../merchant/entities/merchant.entity';

@Entity({
  tableName: 'customers',
})
export class Customer extends BaseEntity {
  @Property({
    type: 'varchar',
  })
  @Index()
  fullname!: string;

  @Property({
    type: 'text',
  })
  photo: string;

  @Property({
    type: 'varchar',
  })
  gender!: string;

  @Property({
    type: 'date',
  })
  bod!: Date;

  @Property({
    type: 'text',
  })
  address!: string;

  @OneToOne(() => Account)
  account: Account;
}
