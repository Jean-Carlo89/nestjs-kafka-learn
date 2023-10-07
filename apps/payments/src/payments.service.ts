import { Inject, Injectable, Post } from '@nestjs/common';
import { PrismaService } from './prisma/prisma/prisma.service';
import { PaymentDto } from './payment.dto';
import { PaymentStatus } from '.prisma/client/payments';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PaymentsService {
  constructor(
    private PrismaService: PrismaService, // @Inject('PAYMENTS_SERVICE') // private kafkaClient: ClientKafka,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  async payment(data: PaymentDto) {
    console.log('payment called');
    const payment = await this.PrismaService.payment.create({
      data: { ...data, status: PaymentStatus.APPROVED },
    });

    //  await lastValueFrom(this.kafkaClient.emit('payments', payment));
    return payment;
  }

  all() {
    return this.PrismaService.payment.findMany();
  }
}
