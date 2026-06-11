import 'reflect-metadata';
import { config } from 'dotenv';
import { DataSource } from 'typeorm';

config();
export default new DataSource({
  type: 'postgres',
  url: process.env.DATABASE_URL,
  ...(process.env.DATABASE_URL
    ? { ssl: { rejectUnauthorized: false } }
    : {
        host: process.env.DATABASE_HOST ?? '127.0.0.1',
        port: parseInt(process.env.DATABASE_PORT ?? '5433', 10),
        username: process.env.DATABASE_USER ?? 'spinywheely',
        password: process.env.DATABASE_PASSWORD ?? 'spinywheely',
        database: process.env.DATABASE_NAME ?? 'spinywheely',
      }),
  entities: [__dirname + '/entities/*.entity.{ts,js}'],
  migrations: [__dirname + '/migrations/*.{ts,js}'],
  synchronize: false,
});
