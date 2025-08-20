
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User) private userModel: typeof User) { }

    async getUserById(userId: number): Promise<User> {
        const user = await this.userModel.findByPk(userId);
        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async getUserByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({ where: { email } });
    }

    async getUserByUsername(username: string): Promise<User | null> {
        return this.userModel.findOne({ where: { username } });
    }

    async updateProfile(userId: number, updateUserDto: UpdateUserDto): Promise<User> {
        const user = await this.getUserById(userId);

        if (updateUserDto.password) {
            updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
        }

        await user.update(updateUserDto);
        return user;
    }
}
