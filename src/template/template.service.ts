import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TemplateEntity } from './entity/template.entity';
import { Repository } from 'typeorm';
import { CreateTemplateDto } from './dtos/createTemplate.dto';
import { UserService } from 'src/user/user.service';
import { CampoEntity } from 'src/campo/entity/campo.entity';
import { CampoService } from 'src/campo/campo.service';

@Injectable()
export class TemplateService {

    constructor(
        @InjectRepository(TemplateEntity)
        private templateRepository: Repository<TemplateEntity>,
        private readonly userService: UserService,
        private readonly campoService: CampoService
    ) {}

    async createTemplate(createTemplate: CreateTemplateDto,userId: number): Promise<TemplateEntity> {
        return this.templateRepository.save({
            ...createTemplate,
            userId,
        });
        
    }
    //crie  afuncao de criar template com campos abaixo
    async getTemplateByUser(id: number): Promise<TemplateEntity> {

        await this.userService.getUserById(id);
    
        return this.templateRepository.findOne({
            where: {
                userId: id
            },
        });
    }

    async getTemplatesAtivos(): Promise<TemplateEntity[]> {
        const ativos = await this.templateRepository.find({
            where: {
                status: 'pendente'
            },
        });

        if(!ativos){
            throw new Error('Não há templates ativos');
        }

        return ativos;
    }

}
