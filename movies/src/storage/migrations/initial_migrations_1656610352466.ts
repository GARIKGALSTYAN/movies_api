import { MigrationInterface, QueryRunner } from "typeorm"

export class InitialTablesCreate_1656610352466 implements MigrationInterface {
    async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
            CREATE TABLE IF NOT EXISTS movies (
                id SERIAL PRIMARY KEY,
                created_at timestamp with time zone not null,
                updated_at timestamp with time zone not null,

                user_id integer not null,

                title varchar(128) not null,
                genre varchar(64) not null,
                director varchar(64) not null,
                release_date timestamp with time zone not null
            );

            `,
        )
    }

    async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `
            DROP TABLE IF EXISTS movies;
            `,
        )
    }
}
