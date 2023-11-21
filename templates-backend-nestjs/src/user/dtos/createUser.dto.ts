import { IsEmail, IsString } from "class-validator";
import { UserType } from "../enum/user-type.enum";

export class CreateUserDto {
    @IsString()
    name: string;

    @IsEmail()
    email: string;
    
    @IsString()
    cpf: string;

    @IsString()
    matricula: string;

    @IsString()
    password: string;

    @IsString()
    typeUser: UserType;
}