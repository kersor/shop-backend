import { HttpException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { CreateOrderDto } from './dto/create.dto';

@Injectable()
export class OrderService {
    constructor (
        readonly prisma: PrismaService,
        readonly jwtService: JwtService
    ) {}

    async createOrder (dto: CreateOrderDto, token: string) {
        const user = await this.jwtService.verify(token)
        if (!user) throw new HttpException("Неверный токен", 401)

        const order = await this.prisma.order.create({
            data: {
                userId: user.id,
                total: dto.total
            }
        }) 

        const ordersProducts = dto.products.map((product) => {
            return {
                orderId: order.id,
                productId: product.productId,
                count: product.count,
                price: product.price
            }
        })

        const orderProducts = await this.prisma.orderProducts.createMany({
            data: ordersProducts
        })

        return orderProducts
    } 

    async getAllOrders (token: string) {
        const user = await this.jwtService.verify(token)
        if (!user) throw new HttpException("Неверный токен", 401)

        const orders = await this.prisma.order.findMany({
            where: {
                userId: user.id
            },
            include: {
                products: {
                    include: {
                        product: true
                    }
                }
            }
        })
        
        const cart = await this.prisma.cart.findFirst({where: {userId: user.id}})

        await this.prisma.cartProduct.deleteMany({
            where: {
                cartId: cart?.id
            }
        })


        return orders
    }
}
