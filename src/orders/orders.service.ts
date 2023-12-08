import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}
  async create(data: { asset_id: string; price: number }) {
    try {
      await this.prismaService.asset.findFirstOrThrow({
        where: {
          id: data.asset_id,
        },
      });
      const response = await this.prismaService.order.create({
        data: {
          ...data,
          status: OrderStatus.PENDING,
        },
      });

      return response;
    } catch (error) {
      throw new HttpException(
        'Asset não existe',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );
    }
  }

  findAll() {
    return this.prismaService.order.findMany({
      include: {
        Asset: {
          select: {
            id: true,
            symbol: true,
          },
        },
      },
    });
  }
}
