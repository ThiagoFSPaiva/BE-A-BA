import { UserEntity } from "src/user/entity/user.entity";
import { Column, CreateDateColumn, Entity,JoinColumn,ManyToOne,PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity ({name: 'template'})
export class TemplateEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({name: 'user_id', nullable: false})
    userId: number;

    @Column({name: 'name', nullable: false})
    name: string;

    @Column({name: 'extensao', nullable: false})
    extensao: string;
    
    @Column({name: 'status',nullable: false, default: 'pendente'})
    status: string;

    @CreateDateColumn({name: 'created_at', nullable: false})
    createdAt: Date;

    @UpdateDateColumn({name: 'updated_at', nullable: false})
    updatedAt: Date;

    @ManyToOne(() => UserEntity, user => user.templates)
    @JoinColumn({name:'user_id', referencedColumnName:'id'})
    user?: UserEntity;
}
