import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client'; // Стандартный дефолтный импорт

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  
  // Метод вызывается при старте NestJS
  async onModuleInit() {
    await this.$connect();
  }

  // Метод вызывается при остановке NestJS
  async onModuleDestroy() {
    await this.$disconnect();
  }
}