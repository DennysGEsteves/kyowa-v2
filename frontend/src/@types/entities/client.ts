import type { Address } from "./address";

export type InterestProduct =
  | "cushion"
  | "carpet"
  | "curtain"
  | "mirror"
  | "others"
  | "wallpaper"
  | "blind"
  | "floor"
  | "mat"
  | "awning";

export type ClientOrigin =
  | "friends"
  | "architect"
  | "internet"
  | "relatives"
  | "radio"
  | "socialNetwork"
  | "tv";

export type Client = {
  id: string;
  name: string;
  nameFilter: string;
  cpf: string | null;
  rg: string | null;
  architectId: string | null;
  nasc: string | null;
  occupation: string | null;
  email: string | null;
  address: Address | null;
  phone1: string | null;
  phone2: string | null;
  obs: string | null;
  active: boolean;
  interestProducts: InterestProduct[] | null;
  origins: ClientOrigin[] | null;
  entry: string;
};

export const interestProductLabels: Record<InterestProduct, string> = {
  cushion: "Almofada",
  carpet: "Carpete",
  curtain: "Cortina",
  mirror: "Espelho",
  others: "Outros",
  wallpaper: "Papel de parede",
  blind: "Persiana",
  floor: "Piso",
  mat: "Tapete",
  awning: "Toldo",
};

export const clientOriginLabels: Record<ClientOrigin, string> = {
  friends: "Amigos",
  architect: "Arquiteto",
  internet: "Internet",
  relatives: "Parentes",
  radio: "Rádio",
  socialNetwork: "Redes sociais",
  tv: "TV",
};

export const clientOrigins: ClientOrigin[] = [
  "friends",
  "architect",
  "internet",
  "relatives",
  "radio",
  "socialNetwork",
  "tv",
];

export const interestProducts: InterestProduct[] = [
  "cushion",
  "carpet",
  "curtain",
  "mirror",
  "others",
  "wallpaper",
  "blind",
  "floor",
  "mat",
  "awning",
];
