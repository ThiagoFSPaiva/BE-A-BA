import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({name:'city'})
export class CityEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({name:'state_id', nullable: false})
    stateId: number;

    @Column({name:'name', nullable: false})
    name: string; 

    @CreateDateColumn({name:'created_at', nullable: false})
    createdAt: Date;

    @UpdateDateColumn({name:'updated_at', nullable: false})
    updatedAt: Date;

}