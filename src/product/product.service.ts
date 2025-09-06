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
    if (query.category !== "all") {
      const products = await this.prisma.product.findMany({
        where: {
          category: {
            code: query.category
          }
        }
      })
      return products
    }
    else {
      const products = await this.prisma.product.findMany()
      return products
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
