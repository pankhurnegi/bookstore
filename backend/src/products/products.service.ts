// src/products/products.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product, ProductCreationAttributes } from './product.entity';
import { CreateProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectModel(Product)
        private productModel: typeof Product,
    ) { }

    async create(createProductDto: CreateProductDto): Promise<Product> {
        return this.productModel.create(createProductDto as ProductCreationAttributes);
    }

    async findAll(): Promise<Product[]> {
        return this.productModel.findAll();
    }

    async findOne(id: number): Promise<Product | null> {
        return this.productModel.findByPk(id);
    }
}
