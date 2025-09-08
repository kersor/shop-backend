import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDto, ProductQueryDto } from './dto/create.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ProductService {
  constructor (
    readonly prisma: PrismaService,
    readonly jwtService: JwtService
  ) {}

  async createProduct (dto: CreateProductDto) {
    const product = await this.prisma.product.create({
      data: {
        ...dto
      }
    })

    return product
  }

  async getAllProduct(query: ProductQueryDto, token?: string) {
    let favoriteId: string | null = null;
    let cartId: string | null = null;

    if (token) {
      try {
        const { favorite, user } = await this.foundFavoriteUser(token);
        favoriteId = favorite.id;

        const cart = await this.prisma.cart.findUnique({ where: { userId: user.id } });
        cartId = cart?.id || null;
      } catch {
        favoriteId = null;
        cartId = null;
      }
    }

    const LIMIT = 12;
    const page = query.page || '1';
    const skip = (+page - 1) * LIMIT;

    const whereClause = query.category !== 'all' ? { category: { code: query.category } } : {};

    const [products, total] = await Promise.all([
      this.prisma.product.findMany({
        skip,
        take: LIMIT,
        where: whereClause,
        include: {
          favorites: favoriteId ? { where: { favoriteId } } : false,
          carts: cartId ? { where: { cartId } } : false,
        },
      }),
      this.prisma.product.count({ where: whereClause }),
    ]);

    // Преобразуем массивы в true/false
    const data = products.map(p => ({
      ...p,
      isFavorite: favoriteId ? p.favorites.length > 0 : false,
      inCart: cartId ? p.carts.length > 0 : false,
      favorites: undefined,
      carts: undefined,
    }));

    const totalPages = Math.ceil(total / LIMIT);
    const remainingPages = totalPages - +page;

    return { data, totalPages, remainingPages };
  }


  async getOneProduct (id: string) {
    const product = await this.prisma.product.findFirst({
      where: {id: id}
    })

    return product
  }

  async deleteOneProduct (id: string) {
    const product = await this.prisma.product.delete({
      where: {id: id}
    })

    return product
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
}
