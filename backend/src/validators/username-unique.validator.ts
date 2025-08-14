import {
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { User } from '../users/user.entity';

@ValidatorConstraint({ async: true })
@Injectable()
export class UsernameUniqueValidator implements ValidatorConstraintInterface {
    async validate(username: string, args: ValidationArguments) {
        const formatRegex = /^[a-zA-Z0-9_]{4,20}$/;
        if (!formatRegex.test(username)) {
            return false;
        }

        // Check if username is already in the database
        const user = await User.findOne({ where: { username } });
        return !user; // valid if no user found
    }

    defaultMessage(args: ValidationArguments) {
        return 'Username must be 4-20 characters, only letters, numbers, underscores allowed, and must be unique';
    }
}
