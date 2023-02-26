import { Migration } from '@mikro-orm/migrations';

export class Migration20230222091907 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "merchants" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "slug" varchar(255) not null, "address" text not null, "lat" text not null, "long" text not null, "phone_number" varchar(255) not null, "since" varchar(255) not null, "photo" text not null, "owner_id" uuid not null, constraint "merchants_pkey" primary key ("id"));');
    this.addSql('create index "merchants_created_at_index" on "merchants" ("created_at");');
    this.addSql('create index "merchants_updated_at_index" on "merchants" ("updated_at");');
    this.addSql('create index "merchants_name_index" on "merchants" ("name");');
    this.addSql('create index "merchants_slug_index" on "merchants" ("slug");');
    this.addSql('alter table "merchants" add constraint "merchants_slug_unique" unique ("slug");');

    this.addSql('alter table "merchants" add constraint "merchants_owner_id_foreign" foreign key ("owner_id") references "owners" ("id") on update cascade;');

    this.addSql('alter table "employees" add column "merchant_id" uuid not null, add column "role_id" uuid not null;');
    this.addSql('alter table "employees" add constraint "employees_merchant_id_foreign" foreign key ("merchant_id") references "merchants" ("id") on update cascade;');
    this.addSql('alter table "employees" add constraint "employees_role_id_foreign" foreign key ("role_id") references "roles" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "employees" drop constraint "employees_merchant_id_foreign";');

    this.addSql('drop table if exists "merchants" cascade;');

    this.addSql('alter table "employees" drop constraint "employees_role_id_foreign";');

    this.addSql('alter table "employees" drop column "merchant_id";');
    this.addSql('alter table "employees" drop column "role_id";');
  }

}
