import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UrlEntity } from './url.entity';
import * as crypto from 'crypto';

@Injectable()
export class UrlService {
    constructor(
        @InjectRepository(UrlEntity)
        private readonly urlRepository: Repository<UrlEntity>,
    ) {}

    async createShortUrl(originalUrl: string, alias?: string, expiresAt?: Date): Promise<UrlEntity> {
        const shortUrl = alias || crypto.randomBytes(4).toString('hex');
        const newUrl = this.urlRepository.create({ originalUrl, shortUrl, expiresAt });
        return this.urlRepository.save(newUrl);
    }

    async findAll(): Promise<UrlEntity[]> {
        return this.urlRepository.find();
    }

    async getOriginalUrl(shortUrl: string): Promise<string> {
        const url = await this.urlRepository.findOne({ where: { shortUrl } });
        if (!url) throw new NotFoundException('URL not found');
        url.clickCount += 1;
        await this.urlRepository.save(url);
        return url.originalUrl;
    }

    async getUrlInfo(shortUrl: string): Promise<UrlEntity> {
        const url = await this.urlRepository.findOne({ where: { shortUrl } });
        if (!url) throw new NotFoundException('URL not found');
        return url;
    }

    async deleteShortUrl(shortUrl: string): Promise<void> {
        await this.urlRepository.delete({ shortUrl });
    }
}
