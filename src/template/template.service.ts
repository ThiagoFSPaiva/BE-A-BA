import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TemplateEntity } from './entity/template.entity';
import { Repository } from 'typeorm';
import { CreateTemplateDto } from './dtos/createTemplate.dto';
import { UserService } from 'src/user/user.service';
import { CampoService } from 'src/campo/campo.service';
import { CreateCampoDto } from 'src/campo/dtos/createCampo.dto';
import { StatusType } from 'src/user/enum/status-type.enum';
import { ReturnCampoDto } from 'src/campo/dtos/returnCampo.dto';

@Injectable()
export class TemplateService {

    constructor(
        @InjectRepository(TemplateEntity)
        private templateRepository: Repository<TemplateEntity>,
        private readonly userService: UserService,
        private readonly campoService: CampoService
    ) {}

    async createTemplate(createTemplate: CreateTemplateDto, userId: string): Promise<TemplateEntity> {
        return this.templateRepository.save({
            ...createTemplate,
            userId,
        });  
    }
    async createTemplateWithFields(createTemplateDto: CreateTemplateDto, userId: string): Promise<TemplateEntity> {
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

      async findAllActiveTemplatesWithAuthors(): Promise<TemplateEntity[]> {
        return this.templateRepository
          .createQueryBuilder('template')
          .leftJoinAndSelect('template.user', 'user')
          .where('template.status = :status', { status: StatusType.Ativo })
          .select([
            'template.id',
            'template.name',
            'template.extensao',
            'template.status',
            'template.createdAt',
            'template.updatedAt',
            'user.name',
          ])
          .getMany();
      }



    async getTemplateByUser(id: string): Promise<TemplateEntity[]> {

        await this.userService.getUserById(id);
    
        const template = await this.templateRepository.find({
            where: {
                userId: id,
                status: StatusType.Pendente
            },
            relations: ['campo'],
            order: {
                createdAt: "DESC"
            }
        });

        if(!template || template.length === 0) {
            throw new NotFoundException('Não foi encontrado Templates para este usuário');
        }

        return template;
    }

    async getTemplatesAtivos(): Promise<TemplateEntity[]> {
        const ativos = await this.templateRepository.find({
            where: {
                status: StatusType.Ativo
            },
            relations: ['campo'],
            order: {
                createdAt: "DESC"
            }
        });

        if(!ativos || ativos.length === 0) {
            throw new NotFoundException('Não foi encontrado Templates ativos');
        }
     
        return ativos;
  
    }

  
    async updateStatus(id: number, status: StatusType): Promise<TemplateEntity> {
        const template = await this.templateRepository.findOne({
            where: {
                id: id
            }
        });
    
        if (!template) {
          throw new NotFoundException('Template não encontrado');
        }
    
        template.status = status;
        return this.templateRepository.save(template);
      }
}