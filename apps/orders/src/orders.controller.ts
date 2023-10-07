import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrderDto } from './order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  getHello(): string {
    return this.ordersService.getHello();
  }

  @Get('/all')
  all() {
    return this.ordersService.all();
  }

  @Post()
  create(@Body() data: OrderDto) {
    //  console.log(data);
    return this.ordersService.create(data);
  }
}
