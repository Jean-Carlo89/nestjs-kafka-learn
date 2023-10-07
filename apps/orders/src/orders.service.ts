import { Inject, Injectable } from '@nestjs/common';
import { PrismaService } from './prisma/prisma/prisma.service';
import { OrderDto } from './order.dto';
import { OrderStatus } from '.prisma/client/orders';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(
    private prismaService: PrismaService,
    @Inject('ORDERS_SERVICE')
    private kafkaClient: ClientKafka,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  all() {
    return this.prismaService.order.findMany();
  }

  async create(data: OrderDto) {
    const data_to_db = { ...data, status: OrderStatus.PENDING };

    //console.log({ data_to_db });
    const order = await this.prismaService.order.create({
      data: data_to_db,
    });

    await lastValueFrom(this.kafkaClient.emit('orders', order));

    return order;
  }
}
