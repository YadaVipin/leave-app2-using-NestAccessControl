import { InternalServerErrorException } from "@nestjs/common";
import { User } from "../auth/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateLeaveDto } from "./dto/create-leave.dto";
import { GetLeavesFilterDto } from "./dto/get-leave.dto";
import { LeaveStatus } from "./leave-status.enum";
import { Leave } from "./leave.entity";

@EntityRepository(Leave)
export class LeaveRepository extends Repository <Leave> {
    async createLeave( createLeaveDto: CreateLeaveDto, user: User):Promise <Leave> {
        const { startDate, endDate, leaveReason } = createLeaveDto;
        
        const leave = this.create({
            leaveReason,
            startDate,
            endDate,
            status: LeaveStatus.PENDING,
            user,
        });
        await this.save(leave);
        return leave;
    }

    async getLeaves(filterDto: GetLeavesFilterDto, ): Promise<Leave[]> {
        const { status, search, sort, page, perPage } = filterDto;


        const query = this.createQueryBuilder('leave');

        if (status) {
            query.andWhere('leave.status = :status', { status })
        }

        if (search) {
            query.andWhere(
                '(LOWER(leave.leaveReason) LIKE LOWER(:search))',
                { search: `%${search}%`},
            );
        }

        if (sort) {
            query.orderBy('leave.startDate', sort );
        }
        
        if (page) {
            query.offset(page-1)
        }
        if (perPage) {
            query.limit(perPage)
        }
        
        try {
            const leaves = await query.getMany();
            return leaves
        } catch (error) {
            throw new InternalServerErrorException(); 
        }
    }

    async getUserLeaves(filterDto: GetLeavesFilterDto, user: User ): Promise<Leave[]> {
        const { status, search, sort, page, perPage } = filterDto;


        const query = this.createQueryBuilder('leave');
        query.where({ user }); 

        if (status) {
            query.andWhere('leave.status = :status', { status })
        }

        if (search) {
            query.andWhere(
                '(LOWER(leave.leaveReason) LIKE LOWER(:search))',
                { search: `%${search}%`},
            );
        }

        if (sort) {
            query.orderBy('leave.startDate', sort );
        }
        
        if (page) {
            query.offset(page-1)
        }
        if (perPage) {
            query.limit(perPage)
        }
        
        try {
            const leaves = await query.getMany();
            return leaves
        } catch (error) {
            throw new InternalServerErrorException(); 
        }
    }
}