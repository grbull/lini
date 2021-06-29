import { MigrationInterface, QueryRunner } from 'typeorm';

export class RemoveNotificationColumnFromSubscription1624975510375
  implements MigrationInterface
{
  name = 'RemoveNotificationColumnFromSubscription1624975510375';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "subscription" DROP COLUMN "notifications"'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'ALTER TABLE "subscription" ADD "notifications" boolean NOT NULL DEFAULT true'
    );
  }
}
