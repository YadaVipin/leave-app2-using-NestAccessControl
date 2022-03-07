import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Leave } from './leave.entity';
import { LeaveRepository } from './leave.repository';
import { GetLeavesFilterDto } from './dto/get-leave.dto';
import { LeaveStatus } from './leave-status.enum';
import { User } from '../auth/user.entity';

@Injectable()
export class LeaveService {
    constructor(
        @InjectRepository(LeaveRepository)
        private leaveRepository: LeaveRepository,
    ) {}
    
    createLeave(createLeavekDto: CreateLeaveDto, user: User): Promise<Leave> {
        return this.leaveRepository.createLeave(createLeavekDto, user);
    }

    getUserLeaves(filterDto: GetLeavesFilterDto, user: User): Promise<Leave[]> {
        return this.leaveRepository.getUserLeaves(filterDto, user);
    }

    getLeaves(filterDto: GetLeavesFilterDto, ): Promise<Leave[]> {
        return this.leaveRepository.getLeaves(filterDto);
    }

    async updateLeaveStatus(id: string, status: LeaveStatus): Promise<Leave> {
            const leave = await this.leaveRepository.findOne({ where: { id}})

            leave.status = status;
            await this.leaveRepository.save(leave);
            return leave;

    }

    async deleteLeave( id: string, user: User ): Promise<void> {
        const result = await this.leaveRepository.delete({id, user});
        if ( result.affected === 0) {
            throw new NotFoundException()
        }
    }
}
