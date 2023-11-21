import { Injectable } from '@nestjs/common';
import { UserEntity } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
import { PasswordResetTokenEntity } from './entity/password-reset-token.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PasswordResetService {
    constructor(
        @InjectRepository(PasswordResetTokenEntity)
        private readonly passwordResetTokenRepository: Repository<PasswordResetTokenEntity>,
    ) { }

    async generateToken(user: UserEntity): Promise<string> {
        const token = Math.random().toString(20).substring(2,12)
        const expirationTime = new Date();
        expirationTime.setHours(expirationTime.getHours() + 1);

        const resetToken = new PasswordResetTokenEntity();
        resetToken.token = token;
        resetToken.user = user;
        resetToken.expiresAt = expirationTime;

        await this.passwordResetTokenRepository.save(resetToken);
        
        return token;
    }

    async validateToken(token: string): Promise<UserEntity | null> {
        const resetToken = await this.passwordResetTokenRepository.findOne({ where: { token }, relations: ['user'] });

        if (resetToken && resetToken.expiresAt > new Date()) {
            return resetToken.user;
        }

        return null;
    }

    async deleteToken(token: string): Promise<void> {
        await this.passwordResetTokenRepository.delete({ token });
    }
}
