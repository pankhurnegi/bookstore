import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CartItem } from './cart.entity';
import { Product } from '../products/product.entity';

@Injectable()
export class CartService {
    constructor(
        @InjectModel(CartItem) private cartItemModel: typeof CartItem,
        @InjectModel(Product) private productModel: typeof Product
    ) { }

    async getUserCart(userId: number): Promise<CartItem[]> {
        console.log("hi")
        return this.cartItemModel.findAll({ where: { userId } });
    }

    async addToCart(userId: number, productId: number, quantity: number): Promise<CartItem> {

        const product = await this.productModel.findByPk(productId);
        console.log("product", product)

        if (!product || !product?.dataValues?.available || product?.dataValues?.stockQuantity < 1) {
            throw new Error('Product not available');
        }
        if (quantity > 5) throw new Error('Max 5 units allowed per cart item');
        if (quantity > product.stockQuantity) throw new Error('Quantity exceeds available stock');

        let item = await this.cartItemModel.findOne({ where: { userId, productId } });
        console.log("item", item)

        if (item) {
            item.quantity = quantity;
            await item.save();
            return item;
        }
        return this.cartItemModel.create({ userId, productId, quantity });
    }

    async removeFromCart(id: number): Promise<void> {
        await this.cartItemModel.destroy({ where: { id } });
    }

    async updateQuantity(id: number, quantity: number): Promise<CartItem> {
        const item = await this.cartItemModel.findByPk(id);
        if (!item) throw new Error('Cart item not found');

        const product = await this.productModel.findByPk(item.productId);
        if (!product) throw new Error('Product not found');

        if (quantity > 5) throw new Error('Max 5 units allowed per cart item');
        if (quantity > product.stockQuantity) throw new Error('Quantity exceeds available stock');
        item.quantity = quantity;
        await item.save();
        return item;
    }

}
