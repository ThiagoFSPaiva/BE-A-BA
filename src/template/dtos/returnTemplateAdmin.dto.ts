import { StatusType } from "src/user/enum/status-type.enum";
import { TemplateEntity } from "../entity/template.entity";
import { CategoryEntity } from "src/category/entity/category.entity";
import { ReturnCategory } from "src/category/dtos/return-category.dto";

export class ReturnTemplateAdminDto {

    name: string;
    extensao: string;
    status: StatusType;
    createdAt: string;
    campo: any[];
    autor: string;
    category?: ReturnCategory;
    id: number;

    constructor(template: TemplateEntity){
        this.name = template.name;
        this.extensao = template.extensao;
        this.status = template.status;
        this.campo = template.campo;
        this.id = template.id
        this.autor = template.user.name.split(' ').filter((_, index, array) => index === 0 || index === array.length - 1).join(' ');
        this.createdAt = template.createdAt.toLocaleDateString('pt-BR') + ' ' + template.createdAt.toLocaleTimeString('pt-BR', {hour: '2-digit', minute: '2-digit'});
        this.category = template.category
        ? new ReturnCategory(template.category)
        : undefined;
    }
}