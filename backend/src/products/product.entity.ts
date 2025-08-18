
import { Table, Column, Model, DataType } from 'sequelize-typescript';

// export interface ProductCreationAttributes {
//     name: string;
//     description: string;
//     authors: string;
//     price: number;
//     stockQuantity: number;
//     available: boolean;
//     category: string;
//     imageUrl?: string;

// }

@Table({ tableName: 'products' })
export class Product extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    name: string;

    @Column({
        type: DataType.TEXT,
        allowNull: false,
    })
    description: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    authors: string;

    @Column({
        type: DataType.DECIMAL(10, 2),
        allowNull: false,
    })
    price: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 0,
    })
    stockQuantity: number;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    })
    available: boolean;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    category: string;

    @Column({
        type: DataType.STRING,
        allowNull: true,
    })
    imageUrl!: string;

}
