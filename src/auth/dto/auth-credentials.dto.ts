/* eslint-disable prettier/prettier */
import { IsString } from "class-validator";
import { UserRole } from "../user-role.enum";


export class AuthCredentialsDto {
    @IsString()
    empId: string;

    @IsString()
    password: string;

    @IsString()
    roles: UserRole;
}