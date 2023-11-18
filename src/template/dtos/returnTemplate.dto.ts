import { StatusType } from "src/user/enum/status-type.enum";
import { TemplateEntity } from "../entity/template.entity";
import { ReturnCategory } from "src/category/dtos/return-category.dto";

export class ReturnTemplateDto {

    name: string;
    extensao: string;
    status: StatusType;
    createdAt: string;
    campo: any[];
    autor: string;
    id: number;
    categoryName: string;
    category?: ReturnCategory;

    constructor(template: TemplateEntity){
        this.name = template.name;
        this.extensao = template.extensao;
        this.status = template.status;
        this.campo = template.campo;
        this.id = template.id
        this.categoryName = template.category.name
        this.createdAt = template.createdAt.toLocaleDateString('pt-BR') + ' ' + template.createdAt.toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'});
        this.category = template.category
        ? new ReturnCategory(template.category)
        : undefined;
    }
}