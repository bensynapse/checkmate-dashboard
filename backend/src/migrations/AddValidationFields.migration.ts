import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddValidationFields1710000000000 implements MigrationInterface {
  name = 'AddValidationFields1710000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Add matchStatus column
    await queryRunner.query(`
      ALTER TABLE \`task\` 
      ADD \`matchStatus\` enum('match', 'mismatch', 'partial', 'pending') 
      DEFAULT 'pending'
    `);

    // Add confidenceScore column
    await queryRunner.query(`
      ALTER TABLE \`task\` 
      ADD \`confidenceScore\` float DEFAULT NULL
    `);

    // Add mismatchReasons column
    await queryRunner.query(`
      ALTER TABLE \`task\` 
      ADD \`mismatchReasons\` json DEFAULT NULL
    `);

    // Add validationDurationSeconds column
    await queryRunner.query(`
      ALTER TABLE \`task\` 
      ADD \`validationDurationSeconds\` int DEFAULT NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`validationDurationSeconds\``);
    await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`mismatchReasons\``);
    await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`confidenceScore\``);
    await queryRunner.query(`ALTER TABLE \`task\` DROP COLUMN \`matchStatus\``);
  }
}