import { BadGatewayException, BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import { UserType } from './enum/user-type.enum';
import { createPasswordHashed, validatePassword } from 'src/utils/password';
import { EmailService } from 'src/email/email.service';
import { StatusType } from './enum/status-type.enum';
import { UpdateUserDto } from './dtos/updateUser.dto';
import { UpdatePasswordDTO } from './dtos/UpdatePassword.dto';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly userRepository: Repository<UserEntity>,
        private readonly emailService: EmailService
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {

        const matriculaExiste = await this.getUserByMatricula(createUserDto.matricula).catch(() => undefined);

        if (matriculaExiste) {
            throw new BadGatewayException('Matricula já registrada no sistema');
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

        this.emailService.sendMatriculaEmail(createUserDto.matricula)

        const lowercaseEmail = createUserDto.email.toLowerCase();

        const createdUser = this.userRepository.save({
            ...createUserDto,
            email: lowercaseEmail,
            password: passwordHashed,
        })

        return createdUser
    }

    async getAllUsers(): Promise<UserEntity[]> {
        return this.userRepository.find();
    }

    async getUserAdmin(userId: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                id: userId,
                typeUser: UserType.Admin
            },
        });

        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }

        return user;
    }


    async getUserById(userId: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                id: userId
            },
        });

        if (!user) {
            throw new NotFoundException('Usuário não encontrado');
        }

        return user;
    }

    async getUserByMatricula(matricula: string): Promise<UserEntity> {
        const user = await this.userRepository.findOne({
            where: {
                matricula: matricula
            },
        });

        if (!user) {
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


    async updateStatus(userId: string, status: StatusType): Promise<UserEntity> {
        const user = await this.getUserById(userId)

        return this.userRepository.save({
            ...user,
            status
        });
    }


    async recoveryPassword (){
        
    }







    async updateTemplate(
        updateTemplate: UpdateUserDto,
        userId: string,
    ): Promise<UserEntity> {
        const user = await this.getUserById(userId);

        if (updateTemplate.password) {
            const passwordHashed = await createPasswordHashed(updateTemplate.password);
            return this.userRepository.save({
                ...user,
                ...updateTemplate,
                password: passwordHashed
            });
        } else {
            return this.userRepository.save({
                ...user,
                ...updateTemplate,
                password: undefined
            });
        }
    }

    async deleteUser(userId: string): Promise<DeleteResult> {
        const template = await this.getUserById(userId)



        return this.userRepository.delete({ id: template.id })
    }


    async updatePassword (newPassword: string,user: UserEntity) {

        const passwordHashed = await createPasswordHashed(newPassword);
        return this.userRepository.save({
            ...user,
            password: passwordHashed
        })
    }


    async updatePasswordUser(
        updatePasswordDTO: UpdatePasswordDTO,
        userId: string,
    ): Promise<UserEntity> {
        const user = await this.getUserById(userId);

        const passwordHashed = await createPasswordHashed(
            updatePasswordDTO.newPassword,
        );

        const isMatch = await validatePassword(
            updatePasswordDTO.password,
            user.password || '',
        );

        if (!isMatch) {
            throw new BadRequestException('Senha atual incorreta!');
        }

        return this.userRepository.save({
            ...user,
            password: passwordHashed,
        });
    }

}

