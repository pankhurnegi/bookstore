import { Table, Column, Model, DataType } from 'sequelize-typescript';



@Table({ tableName: 'users' })
export class User extends Model {
    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
        field: 'username'
    })
    declare username: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        unique: true,
        field: 'email'
    })
    declare email: string;

    @Column({
        type: DataType.STRING,
        allowNull: false,
        field: 'password'
    })
    declare password: string;
}
