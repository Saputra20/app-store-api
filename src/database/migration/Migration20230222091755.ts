import { Migration } from '@mikro-orm/migrations';

export class Migration20230222091755 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "employees" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "fullname" varchar(255) not null, "photo" text not null, "gender" varchar(255) not null, "bod" timestamptz(0) not null, "address" text not null, "account_id" uuid not null, constraint "employees_pkey" primary key ("id"));');
    this.addSql('create index "employees_created_at_index" on "employees" ("created_at");');
    this.addSql('create index "employees_updated_at_index" on "employees" ("updated_at");');
    this.addSql('create index "employees_fullname_index" on "employees" ("fullname");');
    this.addSql('alter table "employees" add constraint "employees_account_id_unique" unique ("account_id");');

    this.addSql('alter table "employees" add constraint "employees_account_id_foreign" foreign key ("account_id") references "accounts" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('drop table if exists "employees" cascade;');
  }

}
