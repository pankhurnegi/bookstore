import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { CartItem } from './cart.entity';
import { Product } from '../products/product.entity';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';

@Module({
    imports: [SequelizeModule.forFeature([CartItem, Product])],
    controllers: [CartController],
    providers: [CartService],
})
export class CartModule { }
