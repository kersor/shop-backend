import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateProductDto, ProductQueryDto } from './dto/create.dto';

@Injectable()
export class ProductService {
  constructor (
    readonly prisma: PrismaService
  ) {}

  async createProduct (dto: CreateProductDto) {
    const product = await this.prisma.product.create({
      data: {
        ...dto
      }
    })

    return product
  }

  async getAllProduct (query: ProductQueryDto) {
    const LIMIT = 12
    const page = query.page || "1"
    const skip = (+page - 1) * LIMIT


    if (query.category !== "all") {
      const [data, total] = await Promise.all([
        this.prisma.product.findMany({
          skip,
          take: LIMIT,
          where: {
            category: {
              code: query.category
            }
          }
        }),
        this.prisma.product.count(),
      ])

      const totalPages = Math.ceil(total / LIMIT);
      const remainingPages = totalPages - +page;

      return {
        data: data,
        totalPages,
        remainingPages 
      }
    }
    else {
      const [data, total] = await Promise.all([
        this.prisma.product.findMany({
          skip,
          take: LIMIT,
        }),
        this.prisma.product.count(),
      ])

      const totalPages = Math.ceil(total / LIMIT);
      const remainingPages = totalPages - +page;

      return {
        data: data,
        totalPages,
        remainingPages 
      }
    }
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
}
