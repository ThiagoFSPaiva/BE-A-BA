import { CampoEntity } from "../entity/campo.entity";

export class ReturnCampoDto {
    name: string;
    tipo: string;

    constructor(campo: CampoEntity) {
        this.name = campo.name;
        this.tipo = campo.tipo;
    }


}