import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
 
  @Post()
  async createCategory (@Body() dto: CreateCategoryDto) {
    return this.categoryService.createCategory(dto)
  }

  @Get()
  async getAll () {
    return this.categoryService.getAll()
  }

  @Get(":id")
  async getOne (@Param("id") id: string) {
    return this.categoryService.getOne(id)
  }

  @Delete(":id")
  async deleteOne (@Param("id") id: string) {
    return this.categoryService.deleteOne(id)
  }
}
