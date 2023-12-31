import { Column, CreateDateColumn, Entity, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { TemplateEntity } from "src/template/entity/template.entity";
import { UserType } from "../enum/user-type.enum";
import { StatusType } from "../enum/status-type.enum";

@Entity({name:'user'})
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;
 
    @Column({name:'name', nullable: false})
    name: string;

    @Column({name:'matricula', nullable: false, unique: true})
    matricula: string;

    @Column({name: 'status',type: 'enum', enum: StatusType, default: StatusType.Ativo})
    status: StatusType;
    
    @Column({name:'email', nullable: false, unique: true})
    email: string;
        
    @Column({name:'cpf', nullable: false, unique: true})
    cpf: string;
        
    @Column({name:'senha', nullable: false, default: "thiago1234"})
    password: string;

    @Column({ type: 'enum', enum: UserType, default: UserType.User })
    typeUser: UserType;

    @CreateDateColumn({name:'created_at', nullable: false})
    createdAt: Date;

    @UpdateDateColumn({name:'updated_at', nullable: false})
    updatedAt: Date;

    @OneToMany(() => TemplateEntity, templates => templates.user, { onDelete: 'CASCADE' })
    templates?: TemplateEntity[]; 

}

