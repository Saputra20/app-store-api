import { Entity, Property, Unique } from '@mikro-orm/core';
import { BaseEntity } from '../../../common/entity';

@Entity({
  tableName: 'roles',
})
export class Role extends BaseEntity {
  @Property({
    type: 'varchar',
  })
  @Unique()
  slug!: string;

  @Property({
    type: 'varchar',
  })
  @Unique()
  name!: string;

  @Property({
    type: 'int',
    comment: '1: admin, 2: employee',
  })
  type!: number;
}
