import dotenv from 'dotenv';
dotenv.config();

import { DataSource } from 'typeorm';
import { Item } from 'src/models/item.entity';



export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    database: process.env.DATABASE_NAME || 'bdname',
    port: Number(process.env.DATABASE_PORT) || 5432,
    username: process.env.DATABASE_USERNAME || 'postgres',
    password: process.env.DATABASE_PASSWORD || '1234',
    synchronize: process.env.DATABASE_SYNCHRONIZE=='true',
    logging: process.env.NODE_ENV == 'local',
    entities: [Item],
});
