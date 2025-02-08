import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ name: 'IsValidEnum' })
@Injectable()
export class IsValidEnumConstraint implements ValidatorConstraintInterface {
  public validate(value: any, args: ValidationArguments) {
    const enumRef = args.constraints;

    if (Array.isArray(value)) {
      return !value
        .map((val) => this.isValidValue(val, enumRef))
        .includes(false);
    }

    return this.isValidValue(value, enumRef);
  }

  public defaultMessage(args: ValidationArguments) {
    const enumValues = Array.isArray(args.constraints)
      ? args.constraints.flatMap((e) => `${Object.keys(e)}`)
      : `${Object.keys(args.constraints)}`;
    return `${args.property} must have valid values in the range of: [${enumValues}]`;
  }

  private isValidValue(value, enumRef) {
    if (Array.isArray(enumRef)) {
      return enumRef.map((e) => !!e[value]).includes(true);
    }

    return !!enumRef[value];
  }
}

export function IsValidEnum(
  enumRef: any,
  validationOptions?: ValidationOptions,
) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      name: 'IsValidEnum',
      target: object.constructor,
      constraints: enumRef,
      propertyName,
      options: validationOptions,
      validator: IsValidEnumConstraint,
    });
  };
}
