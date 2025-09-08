import { forwardRef, HttpException, Inject, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AddProductDto, DeleteProductDto, ToggleCountProductDto } from './dto/addProduct.dto';
import { AuthService } from 'src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CartService {
    constructor (
        readonly prisma: PrismaService,
        readonly jwtService: JwtService
    ) {}

    async addCartProduct (dto: AddProductDto, token: string) {
        const {cart, user} = await this.foundCartUser(token)

        const foundCart = await this.prisma.cartProduct.findFirst({
            where: {
                cartId: cart.id,
                productId: dto.productId
            }
        })

        if (!foundCart) {
            const newCart = await this.prisma.cartProduct.create({
                data: {
                    productId: dto.productId,
                    count: 1,
                    cartId: cart?.id,
                }
            })
            return newCart
        } else {
            const delCart = await this.prisma.cartProduct.delete({
                where: {
                    cartId_productId: {
                        cartId: cart?.id,
                        productId: dto.productId,
                    },
                }
            })
            return delCart
        }
    }

    async getCartProducts (token: string) {
        const {cart, user} = await this.foundCartUser(token)

        const cartProduct = await this.prisma.cartProduct.findMany({
            where: {
                cartId: cart.id
            },
            include: {
                product: {
                    include: {
                        favorites: true,
                    }
                },
            },
            orderBy: {
                createdAt: 'asc'
            }
        }) 
 
        const total = cartProduct.reduce((acc, item) => (item.count * +item.product.price) + acc, 0)

        return {
            data: cartProduct,
            total: total
        }
    }

    async toogleCountProduct (dto: ToggleCountProductDto, token: string) {
        const {cart, user} = await this.foundCartUser(token)

        const updateDo = 
            dto.type === "increment" ? (
                {increment: 1}
            ) : (
                {decrement: 1}
            )

        const cartProduct = await this.prisma.cartProduct.update({
            where: {
                cartId_productId: {
                    cartId: cart?.id,
                    productId: dto.productId,
                },
            },
            data: {
                count: updateDo
            }
        }) 

        return cartProduct
    }

    async deleteProductInCart (productId: string, token: string) {
        const {cart, user} = await this.foundCartUser(token)

        const delProduct = await this.prisma.cartProduct.delete({
            where: {
                cartId_productId: {
                    cartId: cart?.id,
                    productId: productId,
                },
            }
        })

        return delProduct
    }

    async getCartAndFavoriteCountProducts (token: string) {
        const {favorite} = await this.foundFavoriteUser(token)
        const {cart, user} = await this.foundCartUser(token)

        const countCart = await this.prisma.cartProduct.count({
            where: {
                cartId: cart.id
            }
        })

        const countFavorite = await this.prisma.favoriteProduct.count({
            where: {
                favoriteId: favorite.id
            }
        })

        return {
            countCart,
            countFavorite
        }
    }


    async foundCartUser (token: string) {
        const user = await this.jwtService.verify(token)
        if (!user) throw new HttpException("Неверный токен", 401)

        const cart = await this.prisma.cart.findFirst({where: {
            userId: user.id,
        }})

        if (!cart) throw new HttpException("Не найдена корзина", 400)

        return {
            user,
            cart
        }
    }

    async foundFavoriteUser (token: string) {
        const user = await this.jwtService.verify(token)
        if (!user) throw new HttpException("Неверный токен", 401)

        const favorite = await this.prisma.favorite.findFirst({where: {
            userId: user.id,
        }})

        if (!favorite) throw new HttpException("Не найдена изьранное", 400)

        return {
            user,
            favorite
        }
    }


    async createCart (id: string) {
        const cart = await this.prisma.cart.create({
            data: {
                userId: id
            }
        })

        return cart
    }
}
