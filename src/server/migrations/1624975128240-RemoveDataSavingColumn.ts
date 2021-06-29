import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveDataSavingColumn1624975128240 implements MigrationInterface {
  name = 'RemoveDataSavingColumn1624975128240';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "dataSaving"');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "users" ADD "dataSaving" boolean NOT NULL DEFAULT false'
    );
  }
}
