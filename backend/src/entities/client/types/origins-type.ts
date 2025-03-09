import { registerEnumType } from '@nestjs/graphql';

export enum Origin {
  friends = 'friends',
  architect = 'architect',
  internet = 'internet',
  relatives = 'relatives',
  radio = 'radio',
  socialNetwork = 'socialNetwork',
  tv = 'tv',
}

registerEnumType(Origin, { name: 'Origin' });
