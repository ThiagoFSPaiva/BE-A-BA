import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from 'src/user/entity/user.entity';
import { LoginDto } from './dtos/login.dto';
import { UserService } from 'src/user/user.service';
import { ReturnUserDto } from 'src/user/dtos/returnUser.dto';
import { LoginPayload } from './dtos/loginPayload.dto';
import { ReturnLogin } from './dtos/returnLogin.dto';
import { JwtService } from '@nestjs/jwt';
import { validatePassword } from 'src/utils/password';
import { isEmail } from 'class-validator';
import { StatusType } from 'src/user/enum/status-type.enum';

@Injectable()
export class AuthService {


    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService
    ) { }


    async login(loginDto: LoginDto): Promise<ReturnLogin> {
        const identifier = loginDto.identifier.toLowerCase();

        let user: UserEntity | undefined;

        try {
            if (isEmail(identifier)) {
                user = await this.userService.findUserByEmail(identifier);
            } else {
                user = await this.userService.getUserByMatricula(identifier);
            }
        } catch (error) {
            user = undefined;
        }

        const isMatch = user && (await validatePassword(loginDto.password, user.password || ''));
        
        if (!isMatch) {
            throw new NotFoundException('Login e/ou senha inválidos.');
        }
        
        if (user?.status !== StatusType.Ativo) {
            throw new UnauthorizedException('Usuário bloqueado. Acesso não autorizado.');
        }
        const accessToken = this.jwtService.sign({ ...new LoginPayload(user) });

        return {
            accessToken,
            user: new ReturnUserDto(user),
        };
    }
}
