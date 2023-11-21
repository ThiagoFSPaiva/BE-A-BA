import { StatusType } from "aws-sdk/clients/codebuild";
import { UserEntity } from "../entity/user.entity";
import { UserType } from "../enum/user-type.enum";

export class ReturnUserDto {
    id: string;
    name: string;
    email: string;
    cpf: string;
    password: string;
    createdAt: string;
    matricula: string;
    templates?: any[];
    typeUser: UserType;
    status: StatusType;

    constructor(userEntity: UserEntity){
        this.id = userEntity.id;
        this.name = userEntity.name;
        this.matricula = userEntity.matricula;
        this.email = userEntity.email;
        this.cpf = userEntity.cpf;
        this.status = userEntity.status;
        this.typeUser = userEntity.typeUser;
        this.createdAt = userEntity.createdAt.toLocaleDateString('pt-BR') + ' ' + userEntity.createdAt.toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'});
        this.templates = userEntity?.templates;
    }
}