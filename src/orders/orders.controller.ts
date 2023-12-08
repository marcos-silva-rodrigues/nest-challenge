import { Controller, Get, Post, Body } from '@nestjs/common';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(@Body() body: { asset_id: string; price: number }) {
    return await this.ordersService.create(body);
  }

  @Get()
  findAll() {
    return this.ordersService.findAll();
  }
}
