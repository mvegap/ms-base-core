import { SetMetadata } from '@nestjs/common';

export enum Roles {
  SUPERADMIN = 'SUPERADMIN',
  ADMIN = 'ADMIN',
  CONTACT_CENTER = 'CONTACT_CENTER',
  BILLING = 'BILLING',
  VIEWER = 'VIEWER',
}

export const RoleAllowed = (...role: Roles[]) => SetMetadata('roles', role);
