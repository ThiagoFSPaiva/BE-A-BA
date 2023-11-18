import { CategoryType } from "../../category/types/CategoryType";

export interface TemplateType {
    id: number;
    name: string;
    extensao: string;
    status: string;
    createdAt: string;
    templateId: number;
    campo: any[];
    autor: string;
    categoryName: string;
}