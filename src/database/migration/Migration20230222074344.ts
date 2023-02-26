import { Migration } from '@mikro-orm/migrations';

export class Migration20230222074344 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "roles" add column "permissions" text[] not null;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "roles" drop column "permissions";');
  }

}
