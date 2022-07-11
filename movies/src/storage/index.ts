import { DataSource } from 'typeorm';
import { DATABASE_CONFIG } from '../env.config';
import { MoiveEntity } from './entities';
import { InitialTablesCreate_1656610352466 } from './migrations';


export const data_source: DataSource = new DataSource({
  type: "postgres",
  synchronize: false,

  host: DATABASE_CONFIG.host,
  port: DATABASE_CONFIG.port,
  username: DATABASE_CONFIG.username,
  password: DATABASE_CONFIG.password,
  database: DATABASE_CONFIG.database_name,

  entities: [
    MoiveEntity,
  ],
  migrations: [
    InitialTablesCreate_1656610352466,
  ],
});


export async function initStorageConnection() {
  await data_source.initialize();
  await data_source.runMigrations();
}

export * as StorageAPI from "./api";
