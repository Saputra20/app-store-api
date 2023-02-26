import { Migration } from '@mikro-orm/migrations';

export class Migration20230222091336 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "admins" add constraint "admins_account_id_unique" unique ("account_id");');
  }

  async down(): Promise<void> {
    this.addSql('alter table "admins" drop constraint "admins_account_id_unique";');
  }

}
