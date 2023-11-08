import { CampoEntity } from "../entity/campo.entity";

export class ReturnCampoDto {
    name?: string;
    tipo?: string;
    isNull: boolean;

    constructor(campo: CampoEntity) {
        this.name = campo.name;
        this.tipo = campo.tipo;
        this.isNull = campo.isNull;
    }


}