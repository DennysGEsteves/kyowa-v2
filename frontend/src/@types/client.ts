import type { Architect } from "./architect";

export const interestProductMap = {
  cushion: "cushion",
  carpet: "carpet",
  curtain: "curtain",
  mirror: "mirror",
  others: "others",
  wallpaper: "wallpaper",
  blind: "blind",
  floor: "floor",
  mat: "mat",
  awning: "awning",
};

export const originMap = {
  friends: "friends",
  architect: "architect",
  internet: "internet",
  relatives: "relatives",
  radio: "radio",
  socialNetwork: "socialNetwork",
  tv: "tv",
};

export type InterestProductType = keyof typeof interestProductMap;
export type OriginType = keyof typeof originMap;

export type Client = {
  mid?: string;
  id?: number;
  name: string;
  nameFilter?: string;
  cpf?: string;
  rg?: string;
  birthday?: string;
  occupation?: string;
  email?: string;
  address?: string;
  phone?: string;
  obs?: string;
  active?: boolean;
  interestProducts?: InterestProductType[];
  origins?: OriginType[];
  createdAt?: Date;
  architectId?: string;

  architect?: Architect;
};
