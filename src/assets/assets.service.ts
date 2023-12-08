import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AssetsService {
  constructor(private prismaService: PrismaService) {}

  async create(data: { id: string; symbol: string }) {
    const alreadyExists = await this.prismaService.asset.findFirst({
      where: {
        id: data.id,
      },
    });

    if (alreadyExists)
      throw new HttpException(
        'Asset já existe',
        HttpStatus.UNPROCESSABLE_ENTITY,
      );

    return this.prismaService.asset.create({
      data,
    });
  }

  findAll() {
    return this.prismaService.asset.findMany();
  }
}
