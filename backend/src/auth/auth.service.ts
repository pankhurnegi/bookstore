import { Injectable, UnauthorizedException, BadRequestException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.entity';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';

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

    // async updateProfile(userId: number, updateProfileDto: UpdateUserDto): Promise<User> {
    //     const user = await User.findByPk(userId);
    //     if (!user) throw new NotFoundException('User not found');

    //     if (updateProfileDto.email && updateProfileDto.email !== user.email) {
    //         const existingEmail = await User.findOne({ where: { email: updateProfileDto.email } });
    //         if (existingEmail) throw new BadRequestException('Email already in use');
    //     }

    //     if (updateProfileDto.username && updateProfileDto.username !== user.username) {
    //         const existingUsername = await User.findOne({ where: { username: updateProfileDto.username } });
    //         if (existingUsername) throw new BadRequestException('Username already in use');
    //     }

    //     if (updateProfileDto.password) {
    //         updateProfileDto.password = await bcrypt.hash(updateProfileDto.password, 10);
    //     }

    //     await user.update(updateProfileDto);
    //     return user;
    // }
}
