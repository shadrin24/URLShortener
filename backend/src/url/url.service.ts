import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UrlEntity } from './url.entity';
import { VisitEntity } from './visit.entity';

@Injectable()
export class UrlService {
    constructor(
        @InjectRepository(UrlEntity)
        private readonly urlRepository: Repository<UrlEntity>,

        @InjectRepository(VisitEntity)
        private readonly visitRepository: Repository<VisitEntity>,
    ) {}

    async createShortUrl(originalUrl: string, alias?: string, expiresAt?: Date): Promise<UrlEntity> {
        const shortUrl = alias || Math.random().toString(36).substring(2, 8);
        const newUrl = this.urlRepository.create({ originalUrl, shortUrl, expiresAt });
        return this.urlRepository.save(newUrl);
    }

    async findAll(): Promise<UrlEntity[]> {
        return this.urlRepository.find({ relations: ['visits'] });
    }

    async getOriginalUrl(shortUrl: string, ipAddress: string): Promise<string> {
        const url = await this.urlRepository.findOne({ where: { shortUrl }, relations: ['visits'] });
        if (!url) throw new NotFoundException('URL not found');

        // Увеличиваем количество переходов
        url.clickCount += 1;
        await this.urlRepository.save(url);

        // Сохраняем информацию о переходе
        const visit = this.visitRepository.create({ url, ipAddress });
        await this.visitRepository.save(visit);

        return url.originalUrl;
    }

    async getUrlStats(shortUrl: string): Promise<UrlEntity> {
        const url = await this.urlRepository.findOne({
            where: { shortUrl },
            relations: ['visits'],
        });
        if (!url) throw new NotFoundException('URL not found');
        return url;
    }

    async deleteShortUrl(shortUrl: string): Promise<void> {
        await this.urlRepository.delete({ shortUrl });
    }

    async getAnalytics(shortUrl: string): Promise<{ clickCount: number; lastIPs: string[] }> {
        const url = await this.urlRepository.findOne({
            where: { shortUrl },
            relations: ['visits'],
        });

        if (!url) throw new NotFoundException('URL not found');

        // Берём последние 5 переходов, сортируем по дате убывания
        const lastIPs = url.visits
            .sort((a, b) => b.visitedAt.getTime() - a.visitedAt.getTime()) // Сортировка от новых к старым
            .slice(0, 5) // Берём 5 последних
            .map((visit) => visit.ipAddress); // Извлекаем IP-адреса

        return {
            clickCount: url.clickCount,
            lastIPs,
        };
    }

}
