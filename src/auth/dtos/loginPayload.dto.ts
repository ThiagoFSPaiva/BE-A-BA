import { UserEntity } from "src/user/entity/user.entity";

export class LoginPayload {
    id: number;
    typeUser: string;

    constructor(user: UserEntity) {
        this.id = user.id;
        this.typeUser = user.typeUser;
    }
}