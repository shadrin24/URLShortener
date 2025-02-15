import { Controller, Post, Get, Delete, Body, Param, NotFoundException } from '@nestjs/common';
import { UrlService } from './url.service';

@Controller('url')
export class UrlController {
    constructor(private readonly urlService: UrlService) {}

    @Post('/shorten')
    async shortenUrl(
        @Body('originalUrl') originalUrl: string,
        @Body('alias') alias?: string,
        @Body('expiresAt') expiresAt?: Date,
    ) {
        return this.urlService.createShortUrl(originalUrl, alias, expiresAt);
    }

    @Get('/')
    async getAllUrls() {
        return this.urlService.findAll(); // Предполагаем, что у тебя есть метод findAll в сервисе
    }

    @Get('/:shortUrl')
    async redirect(@Param('shortUrl') shortUrl: string) {
        return this.urlService.getOriginalUrl(shortUrl);
    }

    @Get('/info/:shortUrl')
    async getInfo(@Param('shortUrl') shortUrl: string) {
        return this.urlService.getUrlInfo(shortUrl);
    }

    @Delete('/delete/:shortUrl')
    async delete(@Param('shortUrl') shortUrl: string) {
        await this.urlService.deleteShortUrl(shortUrl);
        return { message: 'Deleted successfully' };
    }
}
