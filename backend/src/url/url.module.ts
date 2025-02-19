import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlController } from './url.controller';
import { UrlService } from './url.service';
import { UrlEntity } from './url.entity';
import {VisitEntity} from "./visit.entity";

@Module({
    imports: [TypeOrmModule.forFeature([UrlEntity, VisitEntity])],
    controllers: [UrlController],
    providers: [UrlService],
})
export class UrlModule {}
