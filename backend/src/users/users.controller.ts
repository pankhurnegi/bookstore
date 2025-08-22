import { Controller, Put, Body, Param, UseGuards, Req, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    async getUserProfile(@Param('id') id: number) {
        const user = await this.usersService.getUserById(id);
        return { statusCode: 200, data: user };
    }

    @UseGuards(JwtAuthGuard)
    @Put('profile/:id')
    async updateProfile(
        @Param('id') id: number,
        @Body() updateUserDto: UpdateUserDto,
        @Req() req: any
    ) {

        if (updateUserDto.email) {
            const existingEmail = await this.usersService.getUserByEmail(updateUserDto.email);
            if (existingEmail && existingEmail.id !== Number(id)) {
                return { statusCode: 400, message: 'Email already in use' };
            }
        }
        if (updateUserDto.username) {
            const existingUsername = await this.usersService.getUserByUsername(updateUserDto.username);
            if (existingUsername && existingUsername.id !== Number(id)) {
                return { statusCode: 400, message: 'Username already in use' };
            }
        }

        const updatedUser = await this.usersService.updateProfile(id, updateUserDto);
        return { statusCode: 200, message: 'Profile updated', data: updatedUser };
    }
}
