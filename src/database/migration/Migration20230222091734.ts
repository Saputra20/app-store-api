import { Migration } from '@mikro-orm/migrations';

export class Migration20230222091734 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "customers" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "fullname" varchar(255) not null, "photo" text not null, "gender" varchar(255) not null, "bod" timestamptz(0) not null, "address" text not null, "account_id" uuid not null, constraint "customers_pkey" primary key ("id"));');
    this.addSql('create index "customers_created_at_index" on "customers" ("created_at");');
    this.addSql('create index "customers_updated_at_index" on "customers" ("updated_at");');
    this.addSql('create index "customers_fullname_index" on "customers" ("fullname");');
    this.addSql('alter table "customers" add constraint "customers_account_id_unique" unique ("account_id");');

    this.addSql('alter table "customers" add constraint "customers_account_id_foreign" foreign key ("account_id") references "accounts" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "customers" cascade;');
  }

}
