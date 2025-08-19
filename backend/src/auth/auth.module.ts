import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
    imports: [
        UsersModule,
        PassportModule,
        ConfigModule,
          
        JwtModule.registerAsync({
            imports: [ConfigModule],
            useFactory: async (configService: ConfigService) => ({
                secret: configService.get<string>('JWT_SECRET') || 'dev_secret', // safer fallback
                signOptions: { expiresIn: '1d' },
            }),
            inject: [ConfigService],
        }),
    ],
    providers: [AuthService, JwtStrategy, JwtAuthGuard],
    controllers: [AuthController],
})
export class AuthModule { }
