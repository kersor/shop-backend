import { Controller, Post, Body, Get, Param, Delete, Query, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, ProductQueryDto } from './dto/create.dto';
import { Request } from 'express';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async createProduct(@Body() dto: CreateProductDto) {
    return this.productService.createProduct(dto);
  }

  @Get()
  async getAllProduct (@Query() query: ProductQueryDto, @Req() req: Request) {
    const token = req.headers.authorization?.split(' ')[1] || ""
    return this.productService.getAllProduct(query, token);
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
