import { IsNotEmpty } from "class-validator";

export class CreateLeaveDto {
    @IsNotEmpty()
    leaveReason: string;

    @IsNotEmpty()
    startDate: string;

    @IsNotEmpty()
    endDate: string;

}