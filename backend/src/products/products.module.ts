import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product } from './product.entity';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';

@Module({
    imports: [SequelizeModule.forFeature([Product])],
    providers: [ProductsService],
    controllers: [ProductsController],
})
export class ProductsModule { }