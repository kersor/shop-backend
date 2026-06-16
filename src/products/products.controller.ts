import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async createProduct (@Body() dto: CreateProductDto) {
    return this.productsService.createProduct(dto)
  }

  @Get(':id')
  async getOneProduct (@Param('id') id: string) {
    return this.productsService.getOneProduct(id)
  }
}
