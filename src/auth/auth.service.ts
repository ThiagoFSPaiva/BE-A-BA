import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from 'src/user/entity/user.entity';
import { LoginDto } from './dtos/login.dto';
import { UserService } from 'src/user/user.service';
import { ReturnUserDto } from 'src/user/dtos/returnUser.dto';
import { LoginPayload } from './dtos/loginPayload.dto';
import { ReturnLogin } from './dtos/returnLogin.dto';
import { JwtService } from '@nestjs/jwt';
import { validatePassword } from 'src/utils/password';
import { isEmail } from 'class-validator';

@Injectable()
export class AuthService {


    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }


    async login(loginDto: LoginDto): Promise<ReturnLogin> {
        let user: UserEntity | undefined;
        const identifier = loginDto.identifier.toLowerCase();
        
        if (isEmail(identifier)) {
            user = await this.userService.findUserByEmail(identifier).catch(() => undefined);
        } else {
            user = await this.userService.getUserByMatricula(identifier).catch(() => undefined);
        }

        const isMatch = await validatePassword(
            loginDto.password,
            user?.password || '',
        );

        if (!user || !isMatch) {
            throw new NotFoundException('Matricula ou senha incorreta');
        }

        return {
            accessToken: this.jwtService.sign({ ...new LoginPayload(user) }),
            user: new ReturnUserDto(user)
        };

    }
}
