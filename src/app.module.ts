import { Module } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { ConfigModule } from '@nestjs/config';
import { LocationsModule } from './locations/locations.module';
import { PrismaService } from './prisma.service';
import { CategoriesModule } from './categories/categories.module';
import { AttributesModule } from './attributes/attributes.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ProductsModule,
    LocationsModule,
    CategoriesModule,
    AttributesModule,
    UploadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
