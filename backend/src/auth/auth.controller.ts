import { Body, Controller, Post, Get, Put, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LoginUserDto } from '../users/dto/login-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { UsersService } from 'src/users/users.service';
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService,
        private readonly userService: UsersService
    ) { }

    @Post('register')
    register(@Body() dto: CreateUserDto) {
        return this.authService.register(dto);
    }

    @Post('login')
    login(@Body() dto: LoginUserDto) {
        return this.authService.login(dto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        return req.user;
    }

    @UseGuards(JwtAuthGuard)
    @Put('profile')
    updateProfile(@Request() req, @Body() updateProfileDto: UpdateUserDto) {
        const userId = req.user.id;
        return this.userService.updateProfile(userId, updateProfileDto);
    }
}
