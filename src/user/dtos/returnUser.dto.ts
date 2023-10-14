import { UserEntity } from "../entity/user.entity";

export class ReturnUserDto {
    id: number;
    name: string;
    email: string;
    cpf: string;
    password: string;
    createdAt: string;
    matricula: string;
    templates?: any[];
    addresses?: any[];

    constructor(userEntity: UserEntity){
        this.id = userEntity.id;
        this.name = userEntity.name;
        this.matricula = userEntity.matricula;
        this.email = userEntity.email;
        this.cpf = userEntity.cpf;
        this.password = userEntity.password;
        this.createdAt = userEntity.createdAt.toLocaleDateString('pt-BR') + ' ' + userEntity.createdAt.toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'});
        this.templates = userEntity.templates;
        this.addresses = userEntity.addresses;
    }
}