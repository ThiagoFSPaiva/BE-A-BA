import { Controller, Post, Body, UsePipes, ValidationPipe, NotFoundException, Inject, forwardRef } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { AuthService } from './auth.service';
import { ReturnLogin } from './dtos/returnLogin.dto';
import { UserService } from 'src/user/user.service';
import { EmailService } from 'src/email/email.service';
import { PasswordResetService } from 'src/password-reset/password-reset.service';
import { UserEntity } from 'src/user/entity/user.entity';


@Controller('auth')
export class AuthController {

    constructor(
        private readonly authService: AuthService,
        private readonly userService: UserService,
        private readonly emailService: EmailService,
        private readonly passwordResetService: PasswordResetService
    ) { }

    @UsePipes(ValidationPipe)
    @Post()
    async login(@Body() loginDto: LoginDto): Promise<ReturnLogin> {
        return this.authService.login(loginDto);
    }

    @Post('recovery')
    async forgotPassword(@Body() body: { email: string }): Promise<void> {
        const user = await this.userService.findUserByEmail(body.email);
    
        if (!user) {
            throw new NotFoundException('Usuário não encontrado.');
        }
    
        const resetToken = await this.passwordResetService.generateToken(user);
        const url = `http://localhost:5173/reset-password/${resetToken}`

        this.emailService.sendResetPasswordEmail(body.email, url);

    }


    @Post('reset-password')
    async resetPassword(@Body() body: { token: string; newPassword: string }): Promise<void> {
        const user = await this.passwordResetService.validateToken(body.token);

        if (!user) {
            throw new NotFoundException('Token inválido ou expirado.');
        }


        await this.userService.updatePassword(body.newPassword,user)

      
        await this.passwordResetService.deleteToken(body.token);
    }
}

    

