import { User } from "src/auth/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { LeaveStatus } from "./leave-status.enum";
import { Exclude } from "class-transformer";

@Entity()
export class Leave {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    leaveReason: string;

    @Column()
    startDate: string;

    @Column()
    endDate: string;

    @Column()
    status: LeaveStatus;

    @ManyToOne( (_type) => User, (user) => user.leaves, {eager: false})
    @Exclude({ toPlainOnly: true})
    user: User;
}