import { IsString, IsEmail, MinLength } from 'class-validator';
import { IsUsernameUnique } from 'src/validators/is-username-unique.decorator';

export class CreateUserDto {
    @IsString()
    @IsUsernameUnique({ message: 'Username is already taken or contains invalid characters' })
    username: string;

    @IsEmail()
    email: string;

    @IsString()
    @MinLength(6)
    password: string;
}
