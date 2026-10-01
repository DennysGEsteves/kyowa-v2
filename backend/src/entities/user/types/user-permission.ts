export enum UserPermission {
  Admin = 'admin',
  Manager = 'manager',
  Sales = 'sales',
  Operational = 'operational',
  Finance = 'finance',
}

export const USER_PERMISSIONS = Object.values(UserPermission);
