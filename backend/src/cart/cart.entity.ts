import { Table, Column, Model, DataType, ForeignKey } from 'sequelize-typescript';
import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';

@Table({ tableName: 'cart_items' })
export class CartItem extends Model {
    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId: number;

    @ForeignKey(() => Product)
    @Column({ type: DataType.INTEGER, allowNull: false })
    productId: number;

    @Column({ type: DataType.INTEGER, allowNull: false })
    quantity: number;
}
