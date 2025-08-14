import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './users/user.entity';

@Module({
    imports: [

        SequelizeModule.forRootAsync({
            useFactory: async () => {


                return {
                    dialect: 'mysql',
                    host: 'localhost',
                    port: 3306,
                    username: process.env.DB_USER,
                    password: process.env.DB_PASSWORD,
                    database: process.env.DB_NAME,
                    models: [User],
                    autoLoadModels: true,
                    synchronize: true,
                };
            },
        }),
    ],
    exports: [SequelizeModule],
})
export class DatabaseModule { }
