import { registerEnumType } from '@nestjs/graphql';

export enum InterestProduct {
  cushion = 'cushion',
  carpet = 'carpet',
  curtain = 'curtain',
  mirror = 'mirror',
  others = 'others',
  wallpaper = 'wallpaper',
  blind = 'blind',
  floor = 'floor',
  mat = 'mat',
  awning = 'awning',
}

registerEnumType(InterestProduct, { name: 'InterestProduct' });
