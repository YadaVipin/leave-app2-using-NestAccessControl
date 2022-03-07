import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, Repository } from "typeorm";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { User } from "./user.entity";
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
 async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { empId, password, roles } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.create({
       empId,
       roles,
       password: hashedPassword
      });
    try {
      await this.save(user);
   } catch (error) {
      // console.log(error.code);
      if (error.code === '23505') {
         throw new ConflictException('Username already exists');
      } else {
         throw new InternalServerErrorException();
      }
   }
 } 
}