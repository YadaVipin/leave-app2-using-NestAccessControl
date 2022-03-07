import { IsEnum, IsNumberString, IsOptional, IsString, IsUppercase } from "class-validator";
import { LeaveStatus } from "../leave-status.enum";

export class GetLeavesFilterDto {
    @IsOptional()
    @IsEnum(LeaveStatus)
    status?: LeaveStatus;

    @IsOptional()
    @IsString()
    search?: string;

    @IsOptional()
    @IsString()
    @IsUppercase()
    sort?: "ASC" | "DESC" ;

    @IsOptional()
    @IsNumberString()
    page?: number;

    @IsOptional()
    @IsNumberString()
    perPage?: number;
}