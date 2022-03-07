import { Module } from '@nestjs/common';
import { LeaveService } from './leave.service';
import { LeaveController } from './leave.controller';
import { LeaveRepository } from './leave.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { AccessControlModule } from 'nest-access-control'
import { roles } from '../auth/user-role.enum';

@Module({
  imports: [
    TypeOrmModule.forFeature([LeaveRepository]),
    AuthModule,
    AccessControlModule.forRoles(roles),
  ],
  providers: [LeaveService ],
  controllers: [LeaveController]
})
export class LeaveModule {}
