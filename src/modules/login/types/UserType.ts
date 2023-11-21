import { UserTypeEnum } from "../../../shared/enums/userType.enum";

export interface UserType {
    accessToken: string;
    id: string;
    name: string;
    matricula: string;
    email: string;
    cpf: string;
    status: string;
    typeUser: UserTypeEnum;
    createdAt?: string;
}