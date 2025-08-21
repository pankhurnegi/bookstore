import { Controller, Post, Body, Get, Query, UseGuards, Req, Delete, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './create-order.dto';

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) { }

    @Post()
    createOrder(@Body() createOrderDto: CreateOrderDto) {
        return this.ordersService.createOrder(createOrderDto);
    }

    @Get()
    async getUserOrders(@Query('userId') userId: number) {
        return this.ordersService.findOrdersByUserId(userId);
    }
    @Delete(':id')
    async cancelOrder(@Param('id') id: number) {
        return this.ordersService.cancelOrder(id);
    }
}
