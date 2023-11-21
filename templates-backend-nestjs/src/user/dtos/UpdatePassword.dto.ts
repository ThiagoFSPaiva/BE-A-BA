import { IsString } from 'class-validator';

export class UpdatePasswordDTO {
  @IsString()
  newPassword: string;

  @IsString()
  password: string;
}