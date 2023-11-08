import { BadGatewayException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto'; 
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { UserType } from './enum/user-type.enum';
import { createPasswordHashed } from 'src/utils/password';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>
    ){}

    async createUser(createUserDto: CreateUserDto) : Promise<UserEntity> {
        const matricula = Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
        const matriculaExiste = await this.userRepository.findOne({
            where: {
                matricula: matricula.toString()
            }
        });

        if(matriculaExiste) {
            return this.createUser(createUserDto);
        }
        
        const passwordHashed = await createPasswordHashed(createUserDto.password);

        const existingUserByEmail = await this.findUserByEmail(createUserDto.email).catch(
            () => undefined,
        );
    
        if (existingUserByEmail) {
            throw new BadGatewayException('E-mail já registrado no sistema');
        }
    
        const existingUserByCpf = await this.findUserByCpf(createUserDto.cpf).catch(
            () => undefined,
        );
    
        if (existingUserByCpf) {
            throw new BadGatewayException('CPF já registrado no sistema');
        }

        return this.userRepository.save({
            ...createUserDto,
            typeUser: UserType.User,
            password: passwordHashed,
            matricula: matricula.toString()
        })
    }

    async getAllUsers() : Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    async getUserById(userId:string) : Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                id: userId
            },
        });

        if(!user) {
            throw new NotFoundException('Usuário não encontrado');
        }

        return user;
    }

    async getUserByMatricula(matricula:string) : Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                matricula: matricula
            },
        });

        if(!user) {
            throw new NotFoundException('Usuário não encontrado');
        }

        return user;
    }

    async findUserByCpf(cpf: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
            cpf,
            },
        });

        if (!user) {
            throw new NotFoundException(`CPF: ${cpf} não encontrado`);
        }

        return user;
    }


    async findUserByEmail(email: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
            email,
            },
        });

        if (!user) {
            throw new NotFoundException(`Email: ${email} não encontrado`);
        }

        return user;
    }
    
    
}

