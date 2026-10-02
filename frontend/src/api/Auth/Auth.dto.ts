export type LoginDTO = {
  email: string;
  password: string;
};

export type AuthenticatedUserDTO = {
  id: string;
  email: string;
  name: string;
  permission: string;
  storeId: string;
  active: boolean;
};
