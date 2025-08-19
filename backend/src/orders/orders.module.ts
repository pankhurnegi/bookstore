
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { Order } from './order.entity';
import { CartItem } from '../cart/cart-item.entity';
import { OrderItem } from './order-item.entity';

@Module({
    imports: [
        SequelizeModule.forFeature([Order, CartItem, OrderItem]), // Register Models
    ],
    controllers: [OrdersController],
    providers: [OrdersService],
    exports: [OrdersService],
})
export class OrdersModule { }
