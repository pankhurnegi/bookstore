import { Column, DataType, Model, Table, HasMany } from 'sequelize-typescript';
import { OrderItem } from './order-item.entity';

@Table({ tableName: 'orders' })
export class Order extends Model {
    @Column({ type: DataType.INTEGER, allowNull: false })
    userId: number;

    @Column({ type: DataType.STRING, allowNull: false })
    addressLine1: string;

    @Column({ type: DataType.STRING, allowNull: true })
    addressLine2: string;

    @Column({ type: DataType.STRING, allowNull: false })
    city: string;

    @Column({ type: DataType.STRING, allowNull: false })
    state: string;

    @Column({ type: DataType.STRING, allowNull: false })
    pinCode: string;

    @Column({ type: DataType.STRING, allowNull: false })
    paymentMethod: string;

    @Column({ type: DataType.DATE, defaultValue: DataType.NOW })
    orderDate: Date;

    @HasMany(() => OrderItem)
    orderItems: OrderItem[];
}
