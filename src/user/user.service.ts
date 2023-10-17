import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto'; 
import { hash } from 'bcrypt';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';

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

        const saltOrRounds = 10;
        const senhaCriptografada = await hash(createUserDto.password, saltOrRounds);

        return this.userRepository.save({
            ...createUserDto,
            typeUser: 1,
            password: senhaCriptografada,
            matricula: matricula.toString()
        })
    }

    async getAllUsers() : Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    async getUserById(userId:number) : Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                id: userId
            },
            relations: ['templates.campo', 'templates']
        });

        if(!user) {
            throw new NotFoundException('User not found');
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
            throw new NotFoundException('User not found');
        }

        return user;
    }

}

