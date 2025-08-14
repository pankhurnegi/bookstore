import { registerDecorator, ValidationOptions } from 'class-validator';
import { UsernameUniqueValidator } from './username-unique.validator';

export function IsUsernameUnique(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName,
            options: validationOptions,
            validator: UsernameUniqueValidator,
        });
    };
}