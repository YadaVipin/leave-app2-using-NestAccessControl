import { IsEnum } from "class-validator";
import { LeaveStatus } from "../leave-status.enum";

export class UpdateLeaveStatusDto {
    @IsEnum(LeaveStatus)
    status: LeaveStatus;
}