import { Module } from '@nestjs/common';
import { PasswordResetService } from './password-reset.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasswordResetTokenEntity } from './entity/password-reset-token.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([PasswordResetTokenEntity])
  ],
  providers: [PasswordResetService],
  exports: [PasswordResetService]
})
export class PasswordResetModule {}
