import {
  BeforeCreate,
  BeforeUpdate,
  Entity,
  Enum,
  Property,
  Unique,
} from '@mikro-orm/core';
import { BaseEntity } from '../../../common/entity';
import { PermissionEnum } from '../../../common/enum';

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

  @Enum({
    items: () => PermissionEnum,
    array: true,
    nullable: false,
  })
  permissions?: any[] = [PermissionEnum.DEFAULT];

  @BeforeCreate()
  createSlug() {
    this.slug = this.name.toLowerCase().split(' ').join('-');
  }

  @BeforeUpdate()
  updateSlug() {
    this.slug = this.name.toLowerCase().split(' ').join('-');
  }
}
