import { MigrationInterface, QueryRunner } from "typeorm";

export class post1706431891606 implements MigrationInterface {
  name = "post1706431891606";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "marketdb"."post"(id uuid,title varchar,content varchar,posted_at timestamp,posted_by varchar)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "marketdb"."post"`);
  }
}
