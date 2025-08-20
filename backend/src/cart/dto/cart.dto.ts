import { Min, Max, IsNumber } from "class-validator";

export class AddToCartDto {
    @IsNumber()
    userId: number;

    @IsNumber()
    productId: number;

    @Min(1)
    @Max(5)
    quantity: number;
}