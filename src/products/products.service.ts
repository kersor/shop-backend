import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UploadService } from 'src/upload/upload.service';

@Injectable()
export class ProductsService {
  constructor (
    private prisma: PrismaService
  ) {}

  async createProduct (dto: CreateProductDto) {
    const {photos_url, ...data} = dto
    const product = await this.prisma.product.create({
      data: {
        ...data,
        rating: 0,
      }
    })

    if (!!photos_url?.length) {
      const imgs = photos_url.map(p => {
        return {photo_url: p, productId: product.id}
      })
      await this.prisma.productPhoto.createMany({
        data: imgs
      })
    }

    return product
  }

  async getOneProduct (id: string) {
    const product = await this.prisma.product.findUnique({
      where: {id},
      include: {
        category: {
          include: {
            children: true
          }
        },
        productPhoto: true
      }
    })

    return product
  }
}
