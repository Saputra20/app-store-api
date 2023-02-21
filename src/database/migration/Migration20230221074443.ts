import { Migration } from '@mikro-orm/migrations';

export class Migration20230221074443 extends Migration {
  async up(): Promise<void> {
    this.addSql('create extension if not exists "uuid-ossp";');

    this.addSql(
      'create table "accounts" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "username" varchar(255) not null, "email" varchar(255) not null, "phone_number" varchar(255) not null, "type" int not null, "password" varchar(255) not null, "is_verified" boolean not null default false, "last_active" timestamptz(0) not null, constraint "accounts_pkey" primary key ("id"));',
    );
    this.addSql(
      'comment on column "accounts"."type" is \'1: admin, 2: owner, 3: employee, 4: customer\';',
    );
    this.addSql(
      'create index "accounts_created_at_index" on "accounts" ("created_at");',
    );
    this.addSql(
      'create index "accounts_updated_at_index" on "accounts" ("updated_at");',
    );
    this.addSql(
      'create index "accounts_username_index" on "accounts" ("username");',
    );
    this.addSql(
      'alter table "accounts" add constraint "accounts_username_unique" unique ("username");',
    );
    this.addSql('create index "accounts_email_index" on "accounts" ("email");');
    this.addSql(
      'alter table "accounts" add constraint "accounts_email_unique" unique ("email");',
    );
    this.addSql(
      'create index "accounts_phone_number_index" on "accounts" ("phone_number");',
    );
    this.addSql(
      'alter table "accounts" add constraint "accounts_phone_number_unique" unique ("phone_number");',
    );

    this.addSql(
      'create table "owners" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "fullname" varchar(255) not null, "photo" text not null, "gender" varchar(255) not null, "bod" timestamptz(0) not null, "address" text not null, "account_id" uuid not null, constraint "owners_pkey" primary key ("id"));',
    );
    this.addSql(
      'create index "owners_created_at_index" on "owners" ("created_at");',
    );
    this.addSql(
      'create index "owners_updated_at_index" on "owners" ("updated_at");',
    );
    this.addSql(
      'create index "owners_fullname_index" on "owners" ("fullname");',
    );

    this.addSql(
      'create table "roles" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "slug" varchar(255) not null, "name" varchar(255) not null, "type" int not null, constraint "roles_pkey" primary key ("id"));',
    );
    this.addSql(
      'comment on column "roles"."type" is \'1: admin, 2: employee\';',
    );
    this.addSql(
      'create index "roles_created_at_index" on "roles" ("created_at");',
    );
    this.addSql(
      'create index "roles_updated_at_index" on "roles" ("updated_at");',
    );
    this.addSql(
      'alter table "roles" add constraint "roles_slug_unique" unique ("slug");',
    );
    this.addSql(
      'alter table "roles" add constraint "roles_name_unique" unique ("name");',
    );

    this.addSql(
      'create table "admins" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "fullname" varchar(255) not null, "photo" varchar(255) not null, "role_id" uuid not null, "account_id" uuid not null, constraint "admins_pkey" primary key ("id"));',
    );
    this.addSql(
      'create index "admins_created_at_index" on "admins" ("created_at");',
    );
    this.addSql(
      'create index "admins_updated_at_index" on "admins" ("updated_at");',
    );

    this.addSql(
      'create table "sinces" ("id" uuid not null default uuid_generate_v4(), "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, constraint "sinces_pkey" primary key ("id"));',
    );
    this.addSql(
      'create index "sinces_created_at_index" on "sinces" ("created_at");',
    );
    this.addSql(
      'create index "sinces_updated_at_index" on "sinces" ("updated_at");',
    );
    this.addSql('create index "sinces_name_index" on "sinces" ("name");');

    this.addSql(
      'alter table "owners" add constraint "owners_account_id_foreign" foreign key ("account_id") references "accounts" ("id") on update cascade;',
    );

    this.addSql(
      'alter table "admins" add constraint "admins_role_id_foreign" foreign key ("role_id") references "roles" ("id") on update cascade;',
    );
    this.addSql(
      'alter table "admins" add constraint "admins_account_id_foreign" foreign key ("account_id") references "accounts" ("id") on update cascade;',
    );
  }

  async down(): Promise<void> {
    this.addSql('drop extension if exists "uuid-ossp";');

    this.addSql(
      'alter table "owners" drop constraint "owners_account_id_foreign";',
    );

    this.addSql(
      'alter table "admins" drop constraint "admins_account_id_foreign";',
    );

    this.addSql(
      'alter table "admins" drop constraint "admins_role_id_foreign";',
    );

    this.addSql('drop table if exists "accounts" cascade;');

    this.addSql('drop table if exists "owners" cascade;');

    this.addSql('drop table if exists "roles" cascade;');

    this.addSql('drop table if exists "admins" cascade;');

    this.addSql('drop table if exists "sinces" cascade;');
  }
}
