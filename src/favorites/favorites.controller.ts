import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { AddProductDto } from './dto/addProduct.dto';
import { Request } from 'express';

@Controller('favorites')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @UseGuards(AuthGuard)
  @Post('/toggle')
  async toggleFavoritesProduct (@Body() dto: AddProductDto, @Req() req: Request) {
    const token = req.headers.authorization?.split(' ')[1] || ""
    return this.favoritesService.toggleFavoritesProduct(dto, token)
  }

  @UseGuards(AuthGuard)
  @Get()
  async getAllFavorites (@Req() req: Request) {
    const token = req.headers.authorization?.split(' ')[1] || ""
    return this.favoritesService.getAllFavorites(token)
  }
}
