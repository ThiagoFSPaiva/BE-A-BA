import { CampoEntity } from "src/campo/entity/campo.entity";
import { UploadEntity } from "src/upload/entity/upload.entity";
import { UserEntity } from "src/user/entity/user.entity";
import { StatusType } from "src/user/enum/status-type.enum";
import { Column, CreateDateColumn, Entity,JoinColumn,ManyToOne,OneToMany,PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity ({name: 'template'})
export class TemplateEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({name: 'user_id', nullable: false})
    userId: number

    @Column({name: 'name', nullable: false})
    name: string;

    @Column({name: 'extensao', nullable: false})
    extensao: string;

    @Column({name: 'status',type: 'enum', enum: StatusType, default: StatusType.Pendente})
    status: StatusType;

    @CreateDateColumn({name: 'created_at', nullable: false})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at', nullable: false})
    updatedAt: Date;

    @ManyToOne(() => UserEntity, user => user.templates)
    @JoinColumn({name:'user_id', referencedColumnName:'id'})
    user: UserEntity;

    @OneToMany(() => CampoEntity, campo => campo.template)
    campo: CampoEntity[];

    @OneToMany(() => UploadEntity, upload => upload.template)
    uploads: UploadEntity[];
}
