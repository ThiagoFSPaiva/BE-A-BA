import { StatusType } from "src/user/enum/status-type.enum";
import { TemplateEntity } from "../entity/template.entity";

export class ReturnTemplateDto {

    name: string;
    extensao: string;
    status: StatusType;
    createdAt: string;
    campo: any;
    autor: string;
    id: number;

    constructor(template: TemplateEntity){
        this.name = template.name;
        this.extensao = template.extensao;
        this.status = template.status;
        this.campo = template.campo;
        this.id = template.id
        this.createdAt = template.createdAt.toLocaleDateString('pt-BR') + ' ' + template.createdAt.toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'});
    }
}