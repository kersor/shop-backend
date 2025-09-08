import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { AddProductDto } from './dto/addProduct.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class FavoritesService {
    constructor (
        readonly prisma: PrismaService,
        readonly jwtService: JwtService
    ) {}

    async toggleFavoritesProduct (dto: AddProductDto, token: string) {
        const {favorite, user} = await this.foundFavoriteUser(token)

        const isFavoriteProduct = await this.prisma.favoriteProduct.findFirst({
            where: { favoriteId: favorite.id, productId: dto.productId }
        })

        if (!isFavoriteProduct) {
            const favoriteProduct = await this.prisma.favoriteProduct.create({
                data: {
                    favoriteId: favorite.id,
                    productId: dto.productId
                }
            })

            return favoriteProduct
        } else {
            const favoriteProduct = await this.prisma.favoriteProduct.delete({
                where: {
                    favoriteId_productId: {
                        favoriteId: favorite.id,
                        productId: dto.productId
                    }
                }
            })

            return favoriteProduct
        }
    }


    async getAllFavorites(token: string) {
        const { favorite, user } = await this.foundFavoriteUser(token);

        // Получаем корзину пользователя (для проверки inCart)
        const cart = await this.prisma.cart.findUnique({ where: { userId: user.id } });
        const cartId = cart?.id || null;

        // Получаем все записи из favoriteProduct для этого пользователя
        const favoriteProducts = await this.prisma.favoriteProduct.findMany({
            where: { favoriteId: favorite.id },
            include: {
            product: {
                include: {
                    carts: cartId ? { where: { cartId } } : false, // проверяем, в корзине ли продукт
                },
            },
            },
            orderBy: { createdAt: 'asc' },
        });

        // Маппим в нужный формат
        const data = favoriteProducts.map(fp => ({
            createdAt: fp.createdAt.toISOString(),
            favoriteId: fp.favoriteId,
            isFavorite: true, // так как это избранные
            productId: fp.productId,
            product: {
                id: fp.product.id,
                name: fp.product.name,
                price: fp.product.price,
                photo: fp.product.photo,
                categoryId: fp.product.categoryId,
                isFavorite: true, // дублируем для удобства фронта
                inCart: cartId ? (fp.product.carts.length > 0 ? true : false) : false,
            },
        }));

        return data;
    }

    


    async foundFavoriteUser (token: string) {
        const user = await this.jwtService.verify(token)
        if (!user) throw new HttpException("Неверный токен", 401)

        const favorite = await this.prisma.favorite.findFirst({where: {
            userId: user.id,
        }})

        if (!favorite) throw new HttpException("Не найдено избранное", 400)

        return {
            user,
            favorite
        }
    }

    async createFavorite (id: string) {
        const favorite = await this.prisma.favorite.create({
            data: {
                userId: id
            }
        })

        return favorite
    }
}
