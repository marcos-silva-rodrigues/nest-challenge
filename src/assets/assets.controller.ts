import { Controller, Get, Post, Body, HttpCode } from '@nestjs/common';
import { AssetsService } from './assets.service';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post()
  @HttpCode(201)
  async create(@Body() body: { id: string; symbol: string }) {
    const response = await this.assetsService.create(body);
    return response;
  }

  @Get()
  async findAll() {
    return await this.assetsService.findAll();
  }
}
