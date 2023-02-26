import { Entity, Index, ManyToOne, Property, Unique } from '@mikro-orm/core';
import { BaseEntity } from '../../../common/entity';
import { Owner } from '../../owner/entities/owner.entity';

@Entity({
  tableName: 'merchants',
})
export class Merchant extends BaseEntity {
  @Property({
    type: 'varchar',
  })
  @Index()
  name!: string;

  @Property({
    type: 'varchar',
  })
  @Index()
  @Unique()
  slug!: string;

  @Property({
    type: 'text',
  })
  address!: string;

  @Property({
    type: 'text',
  })
  lat!: string;

  @Property({
    type: 'text',
  })
  long!: string;

  @Property({
    type: 'string',
  })
  phoneNumber!: string;

  @Property({
    type: 'string',
  })
  since!: string;

  @Property({
    type: 'text',
  })
  photo!: string;

  @ManyToOne(() => Owner)
  owner: Owner;
}
