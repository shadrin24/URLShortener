import { Controller, Post, Get, Delete, Body, Param, Req, NotFoundException } from '@nestjs/common';
import { UrlService } from './url.service';
import { Request } from 'express';

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
        return this.urlService.findAll();
    }

    @Get('/:shortUrl')
    async redirect(@Param('shortUrl') shortUrl: string, @Req() request: Request) {
        const ipAddress = request.ip || request.headers['x-forwarded-for'] || 'unknown';
        return this.urlService.getOriginalUrl(shortUrl, ipAddress as string);
    }

    @Get('/info/:shortUrl')
    async getInfo(@Param('shortUrl') shortUrl: string) {
        return this.urlService.getUrlStats(shortUrl);
    }

    @Delete('/delete/:shortUrl')
    async delete(@Param('shortUrl') shortUrl: string) {
        await this.urlService.deleteShortUrl(shortUrl);
        return { message: 'Deleted successfully' };
    }

    @Get('/analytics/:shortUrl')
    async getAnalytics(@Param('shortUrl') shortUrl: string) {
        return this.urlService.getAnalytics(shortUrl);
    }

}
