import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateOrderDto {
    @IsNumber()
    userId: number;

    @IsString()
    @IsNotEmpty()
    addressLine1: string;

    @IsString()
    addressLine2?: string;

    @IsString()
    @IsNotEmpty()
    city: string;

    @IsString()
    @IsNotEmpty()
    state: string;

    @IsString()
    @IsNotEmpty()
    pinCode: string;

    @IsString()
    @IsNotEmpty()
    paymentMethod: string;
}
