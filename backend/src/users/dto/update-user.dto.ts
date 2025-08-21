import { IsEmail, IsNotEmpty, IsOptional, IsString, MinLength } from 'class-validator';



export class UpdateUserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsOptional()
    @IsString()
    @MinLength(6)
    password?: string;
}
