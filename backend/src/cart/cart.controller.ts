import { Controller, Get, Post, Body, Delete, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { AddToCartDto } from './dto/cart.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('cart')
export class CartController {
    constructor(private readonly cartService: CartService) { }

    @Get()
    getUserCart(@Query('userId') userId: string) {
        return this.cartService.getUserCart(Number(userId));
    }

    @Post()
    addToCart(@Body() dto: AddToCartDto) {
        return this.cartService.addToCart(dto.userId, dto.productId, dto.quantity);
    }

    @Delete(':id')
    removeFromCart(@Param('id') id: string) {
        return this.cartService.removeFromCart(Number(id));
    }

    @Patch(':id')
    updateQuantity(@Param('id') id: string, @Body('quantity') quantity: number) {
        return this.cartService.updateQuantity(Number(id), quantity);
    }
}
