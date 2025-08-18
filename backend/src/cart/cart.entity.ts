import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { User } from '../users/user.entity';
import { Product } from '../products/product.entity';

@Table({ tableName: 'cart_items' })  // remove backslash from table name
export class CartItem extends Model<CartItem> {

    @ForeignKey(() => User)
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId: number;

    @BelongsTo(() => User)
    user: User;

    @ForeignKey(() => Product)
    @Column({ type: DataType.INTEGER, allowNull: false })
    productId: number;

    @BelongsTo(() => Product)
    product: Product;

    @Column({ type: DataType.INTEGER, allowNull: false })
    quantity: number;
}
