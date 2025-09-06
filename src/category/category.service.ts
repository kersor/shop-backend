import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateCategoryDto } from './dto/create.dto';

@Injectable()
export class CategoryService {
    constructor (
        readonly prisma: PrismaService
    ) {}

    async createCategory (dto: CreateCategoryDto) {
        const isHasCategory = await this.prisma.category.findFirst({
            where: { name: dto.name },
        })

        if (isHasCategory) throw new HttpException("Категория уже существует", HttpStatus.BAD_REQUEST)

        const newCategory = await this.prisma.category.create({
            data: {
                ...dto
            }
        })

        return newCategory
    }

    async getAll () {
        const categories = await this.prisma.category.findMany()
        return categories
    }

    async getOne (id: string) {
        const category = await this.prisma.category.findFirst({
            where: {
                id: id
            }
        })
        return category
    }

    async deleteOne (id: string) {
        const category = await this.prisma.category.delete({
            where: {
                id: id
            }
        })
        return category
    }
}
