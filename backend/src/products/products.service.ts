// src/products/products.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product)
        private productModel: typeof Product,
    ) { }

    async create(createProductDto: CreateProductDto): Promise<Product> {
        const obj = { ...createProductDto };
        return this.productModel.create(obj);
    }


    async findAll(): Promise<Product[]> {
        return this.productModel.findAll();
    }

    async findPaginated(page: number, limit: number): Promise<{ data: Product[]; total: number; page: number; totalPages: number }> {
        const offset = (page - 1) * limit;
        const { rows, count } = await this.productModel.findAndCountAll({ offset, limit });
        return {
            data: rows,
            total: count,
            page,
            totalPages: Math.ceil(count / limit)
        };
    }

    async findOne(id: number): Promise<Product | null> {
        return this.productModel.findByPk(id);
    }
}
