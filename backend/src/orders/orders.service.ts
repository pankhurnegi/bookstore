import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Order } from './order.entity';
import { CartItem } from '../cart/cart-item.entity';
import { CreateOrderDto } from './create-order.dto';
import { OrderItem } from './order-item.entity';
import { Product } from 'src/products/product.entity';

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel(Order) private orderModel: typeof Order,
        @InjectModel(CartItem) private cartItemModel: typeof CartItem,
    ) { }

    async createOrder(createOrderDto: CreateOrderDto): Promise<Order> {
        const cartItems = await this.cartItemModel.findAll({ where: { userId: createOrderDto.userId }, include: [Product] });
        if (cartItems.length === 0) {
            throw new BadRequestException('Cart is empty, cannot create order');
        }

        const orderData = { ...createOrderDto };
        const order = await this.orderModel.create(orderData);

        // Create OrderItems for each cart item
        for (const cartItem of cartItems) {
            await OrderItem.create({
                orderId: order.id,
                productId: cartItem.productId,
                quantity: cartItem.quantity,
                price: cartItem.product?.price ?? 0,
            });
        }

        await this.cartItemModel.destroy({ where: { userId: createOrderDto.userId } });

        return order;
    }

    async findOrdersByUserId(userId: number): Promise<Order[]> {
        return this.orderModel.findAll({
            where: { userId },
            include: [
                {
                    model: OrderItem,
                    include: [Product],
                },
            ],
        });
    }




}
