import { UserTypeEnum } from "../enums/userType.enum";

export interface InsertUser {
    name: string;
    email: string;
    cpf: string;
    password: string;
    typeUser: UserTypeEnum
}