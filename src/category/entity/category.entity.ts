import { TemplateEntity } from "src/template/entity/template.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity ({name: 'category'})
export class CategoryEntity {

    @PrimaryGeneratedColumn('rowid')
    id: number; 

    @Column({name: 'name', nullable: false})
    name: string;

    @CreateDateColumn({name: 'created_at', nullable: false})
    createdAt: Date;

    @OneToMany(() => TemplateEntity, (template: TemplateEntity) => template.category)
    templates: TemplateEntity

}