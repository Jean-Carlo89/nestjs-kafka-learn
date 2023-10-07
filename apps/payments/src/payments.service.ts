import { Injectable, Post } from '@nestjs/common';
import { PrismaService } from './prisma/prisma/prisma.service';
import { PaymentDto } from './payment.dto';
import { PaymentStatus } from '.prisma/client/payments';
import { ClientKafka } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class PaymentsService {
  constructor(private PrismaService: PrismaService) {}

  getHello(): string {
    return 'Hello World!';
  }

  payment(data: PaymentDto) {
    return this.PrismaService.payment.create({
      data: { ...data, status: PaymentStatus.APPROVED },
    });
  }

  all() {
    return this.PrismaService.payment.findMany();
  }
}
