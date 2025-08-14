import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) { }

    async register(dto: CreateUserDto) {
        const existingEmail = await User.findOne({ where: { email: dto.email } });
        const existingUsername = await User.findOne({ where: { username: dto.username } });

        if (existingEmail) throw new BadRequestException('Email already in use');
        if (existingUsername) throw new BadRequestException('Username already in use');

        const hashedPassword = await bcrypt.hash(dto.password, 10);

        const user = await User.create({
            username: dto.username,
            email: dto.email,
            password: hashedPassword,
        });

        return { message: 'User registered successfully', user };
    }

    async login(dto: LoginUserDto) {
        const user = await User.findOne({ where: { email: dto.email } });
        if (!user) throw new UnauthorizedException('Invalid credentials');

        if (!dto.password || !user.password) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(dto.password, user.password);
        if (!isPasswordValid) throw new UnauthorizedException('Invalid credentials');

        const payload = { sub: user.id, email: user.email };
        const token = this.jwtService.sign(payload);

        return { access_token: token };
    }
}
