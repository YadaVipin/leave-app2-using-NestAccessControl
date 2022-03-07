import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor (
        @InjectRepository(UsersRepository)
        private usersReository: UsersRepository,
        private jwtService: JwtService,
    ) {}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.usersReository.createUser(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise< {accessToken: string}> {
        const { empId, roles, password } = authCredentialsDto;
        const user = await this.usersReository.findOne({ empId });

        if (user && (await bcrypt.compare(password, user.password) )) {
            const payload: JwtPayload = { empId };
            const accessToken: string = await this.jwtService.sign(payload);
            return { accessToken };
            // return 'success';
        } else {
            throw new UnauthorizedException('Check login credentials')
        }
    }
}
