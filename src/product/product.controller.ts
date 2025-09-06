import { Controller, Post, Body, Get, Param, Delete, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, ProductQueryDto } from './dto/create.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(@Body() dto: CreateProductDto) {
    return this.productService.createProduct(dto);
  }

  @Get()
  async getAllProduct (@Query() query: ProductQueryDto) {
    return this.productService.getAllProduct(query);
  }

  @Get(":id")
  async getOneProduct (@Param("id") id: string) {
    return this.productService.getOneProduct(id);
  }

  @Delete(":id")
  async deleteOneProduct (@Param("id") id: string) {
    return this.productService.deleteOneProduct(id);
  }
}
