import { Entity, Index, ManyToOne, Property } from '@mikro-orm/core';
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

  @ManyToOne(() => Account)
  account: Account;
}
