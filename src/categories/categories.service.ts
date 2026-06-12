 import { BadRequestException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateCategoryCatalogDto, CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma.service';
import { Category } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor (
    private prisma: PrismaService
  ) {}

  async createCategory(dto: CreateCategoryDto): Promise<Category> {
    const isCandidate = await this.prisma.category.findFirst({where: {slug: dto.slug}})
    
    if (isCandidate) {
        throw new HttpException('Город уже существует', HttpStatus.BAD_REQUEST)
    }

    return await this.addCategory(dto)
  }

  async createCategoryMore(dtos: CreateCategoryCatalogDto[]) {
    const slugs = dtos.flatMap((dto) => [
      dto.slug,
      ...(dto.children?.flatMap((c) => [
        c.slug,
        ...(c.children?.map((cc) => cc.slug) ?? []),
      ]) ?? []),
    ]);

    const exists = await this.prisma.category.findFirst({
      where: {
        slug: { in: slugs },
      },
    });

    if (exists) {
      throw new BadRequestException(
        `Категория со slug "${exists.slug}" уже существует`,
      );
    }

    return this.prisma.$transaction(async (tx) => {
      return Promise.all(
        dtos.map((dto) =>
          tx.category.create({
            data: {
              name: dto.name,
              slug: dto.slug,
              children: {
                create: dto.children?.map((c) => ({
                  name: c.name,
                  slug: c.slug,
                  children: {
                    create: c.children?.map((cc) => ({
                      name: cc.name,
                      slug: cc.slug,
                    })),
                  },
                })),
              },
            },
          }),
        ),
      );
    });
  }

  async getAllCategories (): Promise<Category[]> {
    const results = await this.prisma.category.findMany()
    return results
  }
  
  async deleteCategories (id: string) {
    return this.prisma.category.delete({where: {id}})
  }

  async deleteAllCategories () {
    return this.prisma.category.deleteMany()
  }

  async getAllCategoriesCatalog () {
    const results = await this.prisma.category.findMany({
      where: { parentId: null },
      include: {
        children: {
          include: {
            children: true
          }
        }
      }
    })

    return results
  }

  private async addCategory (dto: CreateCategoryDto) {
    return await this.prisma.category.create({
        data: {
          ...dto
        }
    })
  }
}
