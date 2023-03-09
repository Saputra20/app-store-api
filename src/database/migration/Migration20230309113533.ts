import { Migration } from '@mikro-orm/migrations';

export class Migration20230309113533 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "admins" drop constraint "admins_account_id_foreign";');

    this.addSql('alter table "admins" alter column "account_id" drop default;');
    this.addSql('alter table "admins" alter column "account_id" type uuid using ("account_id"::text::uuid);');
    this.addSql('alter table "admins" alter column "account_id" set not null;');
    this.addSql('alter table "admins" add constraint "admins_account_id_foreign" foreign key ("account_id") references "accounts" ("id") on update cascade;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "admins" drop constraint "admins_account_id_foreign";');

    this.addSql('alter table "admins" alter column "account_id" drop default;');
    this.addSql('alter table "admins" alter column "account_id" type uuid using ("account_id"::text::uuid);');
    this.addSql('alter table "admins" alter column "account_id" drop not null;');
    this.addSql('alter table "admins" add constraint "admins_account_id_foreign" foreign key ("account_id") references "accounts" ("id") on update cascade on delete cascade;');
  }

}
