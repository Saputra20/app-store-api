import { Migration } from '@mikro-orm/migrations';

export class Migration20230222090911 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "owners" add constraint "owners_account_id_unique" unique ("account_id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "owners" drop constraint "owners_account_id_unique";');
  }

}
