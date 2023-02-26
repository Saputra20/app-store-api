import { Migration } from '@mikro-orm/migrations';

export class Migration20230222092330 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "owners" drop constraint "owners_merchant_id_foreign";');

    this.addSql('alter table "owners" drop constraint "owners_merchant_id_unique";');
    this.addSql('alter table "owners" drop column "merchant_id";');

    this.addSql('alter table "merchants" add constraint "merchants_owner_id_unique" unique ("owner_id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "owners" add column "merchant_id" uuid not null;');
    this.addSql('alter table "owners" add constraint "owners_merchant_id_foreign" foreign key ("merchant_id") references "merchants" ("id") on update cascade;');
    this.addSql('alter table "owners" add constraint "owners_merchant_id_unique" unique ("merchant_id");');

    this.addSql('alter table "merchants" drop constraint "merchants_owner_id_unique";');
  }

}