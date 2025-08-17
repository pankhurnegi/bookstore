// src/products/product.dto.ts
import { IsNotEmpty, IsString, IsNumber, IsBoolean } from 'class-validator';
import { ProductCreationAttributes } from '../product.entity';

export class CreateProductDto implements ProductCreationAttributes {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsNotEmpty()
    @IsString()
    authors: string;

    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @IsBoolean()
    available: boolean;

    @IsNotEmpty()
    @IsString()
    category: string;
}
