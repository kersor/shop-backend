import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryCatalogDto, CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from '@prisma/client';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  async createCategory (@Body() dto: CreateCategoryDto): Promise<Category> {
    return this.categoriesService.createCategory(dto);
  }

  @Post('/more')
  async createCategoryMore (@Body() dto: CreateCategoryCatalogDto[]){
    return this.categoriesService.createCategoryMore(dto);
  }

  @Get()
  async getAllCategories (): Promise<Category[]> {
    return this.categoriesService.getAllCategories()
  }

  @Get('/catalog')
  async getAllCategoriesCatalog () {
    return this.categoriesService.getAllCategoriesCatalog()
  }

  @Delete(':id')
  async deleteCategories (@Param('id') id: string) {
    return this.categoriesService.deleteCategories(id)
  }

  @Delete()
  async deleteAllCategories () {
    return this.categoriesService.deleteAllCategories()
  }
}
