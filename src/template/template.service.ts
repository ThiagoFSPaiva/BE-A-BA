import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TemplateEntity } from './entity/template.entity';
import { Repository } from 'typeorm';
import { CreateTemplateDto } from './dtos/createTemplate.dto';
import { UserService } from 'src/user/user.service';
import { CampoService } from 'src/campo/campo.service';
import { CreateCampoDto } from 'src/campo/dtos/createCampo.dto';
import { StatusType } from 'src/user/enum/status-type.enum';

@Injectable()
export class TemplateService {

    constructor(
        @InjectRepository(TemplateEntity)
        private templateRepository: Repository<TemplateEntity>,
        private readonly userService: UserService,
        private readonly campoService: CampoService
    ) {}

    async createTemplate(createTemplate: CreateTemplateDto, userId: number): Promise<TemplateEntity> {
        return this.templateRepository.save({
            ...createTemplate,
            userId,
        });  
    }    
    async createTemplateWithFields(createTemplateDto: CreateTemplateDto, userId: number): Promise<TemplateEntity> {
        const { campo } = createTemplateDto;

        const template = await this.createTemplate(createTemplateDto, userId);
    
        const createdCampos = await Promise.all(
          campo.map(async (campoItem: CreateCampoDto) => {
            const createdCampo = await this.campoService.createCampo(campoItem, template.id);
            return createdCampo;
          }),
        );
    
        template.campo = createdCampos;
    
        return template;
      }

    async getTemplateByUser(id: number): Promise<TemplateEntity[]> {

        await this.userService.getUserById(id);
    
        const template = await this.templateRepository.find({
            where: {
                userId: id
            },
            relations: ['campo']
        });

        if(!template || template.length === 0) {
            throw new NotFoundException('No template found');
        }

        return template;
    }

    async getTemplatesAtivos(): Promise<TemplateEntity[]> {
        const ativos = await this.templateRepository.find({
            where: {
                status: StatusType.Ativo
            },
        });

        if(!ativos || ativos.length === 0) {
            throw new NotFoundException('No template found');
        }

        return ativos;
    }

}