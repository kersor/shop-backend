import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { CartModule } from './cart/cart.module';
import { FavoritesModule } from './favorites/favorites.module';

@Module({
  imports: [UserModule, AuthModule, CategoryModule, ProductModule, CartModule, FavoritesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
   