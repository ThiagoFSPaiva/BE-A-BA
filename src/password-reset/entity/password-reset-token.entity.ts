import { UserEntity } from "src/user/entity/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('password_reset_tokens')
export class PasswordResetTokenEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    token: string;

    @ManyToOne(() => UserEntity, { onDelete: 'CASCADE'})
    @JoinColumn({name: 'user_id'})
    user: UserEntity;

    @Column({type: 'timestamp'})
    expiresAt: Date;
}