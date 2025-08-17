// import { Sequelize } from 'sequelize-typescript';
// import { User } from './users/user.entity';
// import { Product } from './products/product.entity';

// export const databaseConnection = [
//     {
//         provide: 'SEQUELIZE',
//         useFactory: async () => {
//             const sequelize = new Sequelize({
//                 dialect: 'mysql',
//                 host: 'localhost',
//                 port: 3306,
//                 username: process.env.DB_USER,
//                 password: process.env.DB_PASSWORD,
//                 database: process.env.DB_NAME,
//             });
//             sequelize.addModels([User, Product]);
//             await sequelize.sync();
//             return sequelize;
//         },
//     },
// ];

