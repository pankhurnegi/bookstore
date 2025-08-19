import { Column, DataType, Model, Table, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Order } from './order.entity';
import { Product } from '../products/product.entity';

@Table({ tableName: 'order_items' })
export class OrderItem extends Model {
    @ForeignKey(() => Order)
    @Column({ type: DataType.INTEGER, allowNull: false })
    orderId: number;

    @ForeignKey(() => Product)
    @Column({ type: DataType.INTEGER, allowNull: false })
    productId: number;

    @Column({ type: DataType.INTEGER, allowNull: false })
    quantity: number;

    @Column({ type: DataType.FLOAT, allowNull: false })
    price: number;

    @BelongsTo(() => Product)
    product: Product;
}
