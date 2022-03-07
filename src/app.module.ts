import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { LeaveModule } from './leave/leave.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { roles } from './auth/user-role.enum';

@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'postgres',
        autoLoadEntities: true,
        synchronize: true,
        host: 'localhost',
        port: 5432,
        username: 'postgres',
        password: 'postgres',
        database: 'leave-app',
      }),
    LeaveModule,
    AuthModule,
  ],
})
export class AppModule {}
