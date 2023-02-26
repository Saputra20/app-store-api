import { Index, PrimaryKey, Property } from '@mikro-orm/core';

export class BaseEntity {
  @PrimaryKey({ type: 'uuid', defaultRaw: 'uuid_generate_v4()' })
  id: string;

  @Property({
    type: 'timestamptz',
  })
  @Index()
  createdAt: Date = new Date();

  @Property({ type: 'timestamptz', onUpdate: () => new Date() })
  @Index()
  updatedAt: Date = new Date();
}
