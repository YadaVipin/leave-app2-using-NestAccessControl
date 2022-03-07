import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { CreateLeaveDto } from './dto/create-leave.dto';
import { GetLeavesFilterDto } from './dto/get-leave.dto';
import { UpdateLeaveStatusDto } from './dto/update-status.dto';
import { Leave } from './leave.entity';
import { LeaveService } from './leave.service';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../auth/get-user.decorator';
import { User } from '../auth/user.entity';
import { ACGuard, UseRoles } from 'nest-access-control';

@Controller('leaves')
@UseGuards(AuthGuard(), ACGuard)
export class LeaveController {
    constructor(private leaveService: LeaveService) {}
    
    @Post()
    @UseRoles({
        possession:'own',
        action:'create',
        resource:'posts'
    })
    createLeave(
        @Body() createLeaveDto: CreateLeaveDto,
        @GetUser() user: User,
    ): Promise<Leave> {
        return this.leaveService.createLeave(createLeaveDto, user);
    }


    @Get()
    @UseRoles({
        possession:'own',
        action:'read',
        resource:'posts'
    })
    getUserLeaves(
        @Query() filterDto: GetLeavesFilterDto,
        @GetUser() user: User,
    ): Promise<Leave[]> {
        return this.leaveService.getUserLeaves(filterDto, user);
    }

    @Get('/allLeaves')
    @UseRoles({
        possession:'any',
        action:'read',
        resource:'posts'
    })
    getLeaves(
        @Query() filterDto: GetLeavesFilterDto,
    ): Promise<Leave[]> {
        return this.leaveService.getLeaves(filterDto);
    }

    @Patch('/:id/status')
    @UseRoles({
        possession: 'any',
        action:'update',
        resource:'posts'
    })
    updateLeaveStatus(
        @Param('id') id: string,
        @Body() updateLeaveStatusDto: UpdateLeaveStatusDto,
    ): Promise<Leave> {
        const { status } = updateLeaveStatusDto;
        return this.leaveService.updateLeaveStatus(id, status);
    }

    @Delete('/:id')
    @UseRoles({
        possession:'own',
        action:'delete',
        resource:'posts'
    })
    deleteLeave(
        @Param('id') id: string,
        @GetUser() user: User,
    ): Promise<void> {
        return this.leaveService.deleteLeave(id, user);
    }
}
