import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CartItem } from './cart-item.entity';
import { Product } from '../products/product.entity';

@Injectable()
export class CartService {
    constructor(
        @InjectModel(CartItem) private cartItemModel: typeof CartItem,
        @InjectModel(Product) private productModel: typeof Product
    ) { }

    async getUserCart(userId: number): Promise<CartItem[]> {
        const g = await this.cartItemModel.findAll({
            where: { userId },
            include: [{ model: this.productModel, as: 'product' }],
        });
        console.log("g", g);

        return g
    }

    async addToCart(userId: number, productId: number, quantity: number): Promise<CartItem> {
        const product = await this.productModel.findByPk(productId);

        if (!product) {
            throw new NotFoundException('Product not found');
        }
        if (product.available !== undefined && !product.available) {
            throw new BadRequestException('Product not available');
        }
        if (quantity > 5) throw new BadRequestException('Max 5 units allowed per cart item');
        if (quantity < 1) throw new BadRequestException('Quantity must be at least 1');
        if (quantity > product.stockQuantity) throw new BadRequestException('Quantity exceeds available stock');

        let item = await this.cartItemModel.findOne({ where: { userId, productId } });
        if (item) {
            item.quantity = quantity;
            await item.save();
            return item;
        }
        return this.cartItemModel.create({ userId, productId, quantity } as any);
    }

    async removeFromCart(id: number): Promise<void> {
        await this.cartItemModel.destroy({ where: { id } });
    }

    async updateQuantity(id: number, quantity: number): Promise<CartItem> {
        let res = await this.cartItemModel.findByPk(id);
        console.log("res", res);

        if (!res) throw new NotFoundException('Cart item not found');

        if (quantity < 1 || quantity > 5) {
            throw new BadRequestException('Quantity must be between 1 and 5');
        }
        res.quantity = quantity || 3;
        console.log("res.quantity", res.quantity);
        const [affectedCount, affectedRows] = await this.cartItemModel.update({ quantity },
            {
                where: { id },
                returning: true,
            });
        return affectedRows[0];
    }

    
}
