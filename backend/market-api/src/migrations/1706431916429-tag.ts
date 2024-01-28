import { MigrationInterface, QueryRunner } from "typeorm";

export class tag1706431916429 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "marketdb"."tag"(id uuid,name_tag varchar)`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
        `DROP TABLE "marketdb"."tag"`,
    );
  }
  name = "tag1706431916429";
}