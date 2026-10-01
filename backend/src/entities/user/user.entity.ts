import { UserPermission } from './types/user-permission';

export class UserEntity {
  constructor(
    public readonly id: string,
    public email: string,
    public name: string,
    public pass: string,
    public phone: string | null,
    public login: string | null,
    public permission: UserPermission,
    public storeId: number,
    public active: boolean,
    public readonly createdAt?: Date,
    public readonly updatedAt?: Date,
  ) {}
}
