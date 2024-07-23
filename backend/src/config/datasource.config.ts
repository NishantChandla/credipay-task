import InitSeeder from 'src/seed/init.seeder';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

export const dataSourceOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  synchronize: false,
  entities: ['src/**/*.entity{.js,.ts}'],
  migrations: ['src/migrations/**/*.ts'],
  seeds: [InitSeeder],
};

export default new DataSource(
  dataSourceOptions as DataSourceOptions & SeederOptions,
);
