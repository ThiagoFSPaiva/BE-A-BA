import { ReturnTemplateDto } from 'src/template/dtos/returnTemplate.dto';
import { CategoryEntity } from '../entity/category.entity';
import { TemplateEntity } from 'src/template/entity/template.entity';


export class ReturnCategory {
  id: number;
  name: string;
  amountTemplates?: number;
  templates?: ReturnTemplateDto[];

  constructor(categoryEntity: CategoryEntity, amountTemplates?: number) {
    this.id = categoryEntity.id;
    this.name = categoryEntity.name;
    this.amountTemplates = amountTemplates;
    this.templates = categoryEntity.templates
    ? categoryEntity.templates.map((template) => new ReturnTemplateDto(template))
    : undefined;
  }
}