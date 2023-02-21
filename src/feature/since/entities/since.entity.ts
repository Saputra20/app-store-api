import { Entity, Index, Property } from '@mikro-orm/core';
import { BaseEntity } from '../../../common/entity';

@Entity({
  tableName: 'sinces',
})
export class Since extends BaseEntity {
  @Property({
    type: 'varchar',
  })
  @Index()
  name!: string;
}
