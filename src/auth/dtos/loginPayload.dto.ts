import { UserEntity } from "src/user/entity/user.entity";

export class LoginPayload {
    id: string;
    typeUser: string;

    constructor(user: UserEntity) {
        this.id = user.id;
        this.typeUser = user.typeUser;
    }
}