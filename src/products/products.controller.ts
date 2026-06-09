import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('slug/:name')
  findOne(@Param('name') name: string) {
    return this.productsService.findAll(name);
  }
}
