import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FavoritesService {
    constructor (
        readonly prisma: PrismaService
    ) {}

    async createFavorite (id: string) {
        const cart = await this.prisma.favorite.create({
            data: {
                userId: id
            }
        })

        return cart
    }
}
