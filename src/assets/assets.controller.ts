import { Controller, Get, Post, Body, HttpCode } from '@nestjs/common';
import { AssetsService } from './assets.service';

@Controller('assets')
export class AssetsController {
  constructor(private readonly assetsService: AssetsService) {}

  @Post()
  @HttpCode(201)
  create(@Body() body: { id: string; symbol: string }) {
    const response = this.assetsService.create(body);
    return response;
  }

  @Get()
  findAll() {
    return this.assetsService.findAll();
  }
}
