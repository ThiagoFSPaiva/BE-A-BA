import { TemplateEntity } from "src/template/entity/template.entity";
import { UserEntity } from "src/user/entity/user.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity ({name: 'upload'})
export class UploadEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({name: 'user_id', nullable: false})
    userId: string

    @Column({name: 'template_id', nullable: false})
    templateId: number

    @Column({name: 'nomeArquivo', nullable: false})
    nomeArquivo: string; 

    @Column({name: 'path', nullable: false})
    path: string;

    @CreateDateColumn({name: 'created_at', nullable: false})
    createdAt: Date; 

    @ManyToOne(() => UserEntity, user => user.templates,{ onDelete: 'CASCADE' })
    @JoinColumn({name:'user_id', referencedColumnName:'id'})
    user: UserEntity;

    @ManyToOne(() => TemplateEntity, template=> template.uploads, { onDelete: 'CASCADE' } )
    @JoinColumn({name:'template_id', referencedColumnName:'id'})
    template: TemplateEntity;
}
