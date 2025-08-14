import { Table, Column, Model, DataType } from 'sequelize-typescript';

// Define interfaces as usual
export interface UserAttributes {
    id?: number;
    username: string;
    email: string;
    password: string;
}

export interface UserCreationAttributes extends Omit<UserAttributes, 'id'> { }

@Table({ tableName: 'users' })
export class User extends Model<UserAttributes, UserCreationAttributes> {
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    // Remove public field declaration here
    declare username: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
    })
    declare email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
    })
    declare password: string;
}
