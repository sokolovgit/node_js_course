import { MigrationInterface, QueryRunner } from "typeorm"

export class Initial1745960710023 implements MigrationInterface {
  name = "Initial1745960710023"

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            CREATE TABLE "note" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "title" character varying NOT NULL,
                "content" text NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                CONSTRAINT "PK_96d0c172a4fba276b1bbed43058" PRIMARY KEY ("id")
            )
        `)
    await queryRunner.query(`
            CREATE TABLE "member" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "path" character varying NOT NULL,
                "name" character varying NOT NULL,
                "bio" text NOT NULL,
                "photo" character varying,
                "academic_faculty" character varying NOT NULL,
                "academic_department" character varying NOT NULL,
                "hobbies" text array NOT NULL,
                "favorite_quote" text NOT NULL,
                CONSTRAINT "PK_97cbbe986ce9d14ca5894fdc072" PRIMARY KEY ("id")
            )
        `)
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
            DROP TABLE "member"
        `)
    await queryRunner.query(`
            DROP TABLE "note"
        `)
  }
}
