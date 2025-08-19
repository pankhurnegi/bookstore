
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/user.entity';
import { Product } from './products/product.entity';
import { Order } from './orders/order.entity';
import { OrderItem } from './orders/order-item.entity';
import { CartItem } from './cart/cart-item.entity';


@Module({
    imports: [
        SequelizeModule.forRootAsync({
            useFactory: async () => ({
                dialect: 'mysql',
                host: 'localhost',
                port: 3306,
                username: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME,
                models: [User, Product, Order, OrderItem, CartItem],
                autoLoadModels: true,
                synchronize: true,
            }),
        }),
    ],
    exports: [SequelizeModule],
})
export class DatabaseModule { }
