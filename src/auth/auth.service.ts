import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/user/entity/user.entity';
import { LoginDto } from './dtos/login.dto';
import { UserService } from 'src/user/user.service';
import { compare } from 'bcrypt';
import { ReturnUserDto } from 'src/user/dtos/returnUser.dto';
import { LoginPayload } from './dtos/loginPayload.dto';
import { ReturnLogin } from './dtos/returnLogin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {


    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) {}


    async login(loginDto: LoginDto): Promise<ReturnLogin> {
        const user: UserEntity | undefined = await this.userService
        .getUserByMatricula(loginDto.matricula)
        .catch(() => undefined);

        const isMatch = await compare(loginDto.password, user?.password || '');

        if(!user || !isMatch) {
            throw new NotFoundException('Matricula ou senha incorreta');
        }

        return {
            accessToken: this.jwtService.sign({...new LoginPayload(user)}),
            user: new ReturnUserDto(user)
        };
            
    }
}
