import { RolesBuilder } from 'nest-access-control'

export enum UserRole {
    EMPLOYEE = 'employee',
    MANAGER = 'manager',
}

export const roles: RolesBuilder = new RolesBuilder();

roles.grant(UserRole.EMPLOYEE)
    .readOwn('posts')
    .createOwn('posts')
    .deleteOwn('posts')
.grant(UserRole.MANAGER)
    .extend(UserRole.EMPLOYEE)
    .readAny('posts')
    .updateAny('posts')
