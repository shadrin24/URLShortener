import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {ConfigModule} from '@nestjs/config';
import {UrlModule} from "./url/url.module";
import { UrlEntity } from './url/url.entity';

@Module({
    imports: [
        ConfigModule.forRoot(), // Загружаем переменные окружения из .env
        TypeOrmModule.forRoot({
            type: 'postgres', // Используем PostgreSQL
            host: process.env.DATABASE_HOST,
            port: Number(process.env.DATABASE_PORT),
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            entities: [UrlEntity],
            autoLoadEntities: true, // Автоматически загружает сущности
            synchronize: true, // Автоматически создаёт таблицы (только для разработки)
        }),
        UrlModule,
    ],
})
export class AppModule {
}
