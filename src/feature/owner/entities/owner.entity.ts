import {
  Collection,
  Entity,
  Index,
  OneToMany,
  OneToOne,
  Property,
} from '@mikro-orm/core';
import { Merchant } from '../../merchant/entities/merchant.entity';
import { BaseEntity } from '../../../common/entity';
import { Account } from '../../account/entities/account.entity';

@Entity({
  tableName: 'owners',
})
export class Owner extends BaseEntity {
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
  bod!: string;

  @Property({
    type: 'text',
  })
  address!: string;

  @OneToOne(() => Account)
  account: Account;

  @OneToMany(() => Merchant, (merchant) => merchant.owner)
  merchants = new Collection<Merchant>(this);
}
