import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
} from 'class-validator';

@ValidatorConstraint({ name: 'isChannelType', async: false })
class IsChannelTypeConstraint {
  public validate(value: any) {
    return value === 'public' || value === 'private';
  }

  public defaultMessage() {
    return 'channel type must be public or private';
  }
}

export function IsChannelType(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isChannelType',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsChannelTypeConstraint,
    });
  };
}
