import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateOrderDto } from './dto/create.dto';
import { Request } from 'express';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @UseGuards(AuthGuard)
  @Post()
  async createOrder (@Body() dto: CreateOrderDto, @Req() req: Request) {
    const token = req.headers.authorization?.split(' ')[1] || ""
    return this.orderService.createOrder(dto, token)
  }

  @UseGuards(AuthGuard)
  @Get()
  async getAllOrders (@Req() req: Request) {
    const token = req.headers.authorization?.split(' ')[1] || ""
    return this.orderService.getAllOrders(token)
  }

}
