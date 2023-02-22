import { Migration } from '@mikro-orm/migrations';

export class Migration20230222032500 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "accounts" alter column "last_active" type timestamptz(0) using ("last_active"::timestamptz(0));');
    this.addSql('alter table "accounts" alter column "last_active" drop not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "accounts" alter column "last_active" type timestamptz(0) using ("last_active"::timestamptz(0));');
    this.addSql('alter table "accounts" alter column "last_active" set not null;');
  }

}
