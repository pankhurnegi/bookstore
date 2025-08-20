// src/products/products.controller.ts
import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/product.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
@Controller('products')

export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Post()
    create(@Body() createProductDto: CreateProductDto) {
        return this.productsService.create(createProductDto);
    }

    @Get()
    findAll() {
        return this.productsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.productsService.findOne(Number(id));
    }
}
