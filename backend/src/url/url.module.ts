import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { UrlEntity } from './url.entity';

@Module({
    imports: [TypeOrmModule.forFeature([UrlEntity])],
    controllers: [UrlController],
    providers: [UrlService],
})
export class UrlModule {}
