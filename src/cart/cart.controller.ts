import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { AddProductDto, DeleteProductDto, ToggleCountProductDto } from './dto/addProduct.dto';
import { Request } from 'express';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(AuthGuard)
  @Post('/add')
  async addCartProduct (@Body() dto: AddProductDto, @Req() req: Request) {
    const token = req.headers.authorization?.split(' ')[1] || ""
    return this.cartService.addCartProduct(dto, token)
  }

  @UseGuards(AuthGuard)
  @Get()
  async getCartProducts (@Req() req: Request) {
    const token = req.headers.authorization?.split(' ')[1] || ""
    return this.cartService.getCartProducts(token)
  } 

  @UseGuards(AuthGuard)
  @Post('/count')
  async toogleCountProduct (@Body() dto: ToggleCountProductDto, @Req() req: Request) {
    const token = req.headers.authorization?.split(' ')[1] || ""
    return this.cartService.toogleCountProduct(dto, token)
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async deleteProductInCart (@Param("id") productId: string, @Req() req: Request) {
    const token = req.headers.authorization?.split(' ')[1] || ""
    return this.cartService.deleteProductInCart(productId, token)
  }

  @UseGuards(AuthGuard)
  @Get('/countTotal')
  async getCartCountProducts (@Req() req: Request) {
    const token = req.headers.authorization?.split(' ')[1] || ""
    return this.cartService.getCartCountProducts(token)
  }
}
