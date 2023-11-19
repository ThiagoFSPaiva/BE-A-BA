import { Inject, Injectable, NotFoundException, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TemplateEntity } from './entity/template.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateTemplateDto } from './dtos/createTemplate.dto';
import { UserService } from 'src/user/user.service';
import { CampoService } from 'src/campo/campo.service';
import { CreateCampoDto } from 'src/campo/dtos/createCampo.dto';
import { StatusType } from 'src/user/enum/status-type.enum';
import { ReturnCampoDto } from 'src/campo/dtos/returnCampo.dto';
import { UserType } from 'src/user/enum/user-type.enum';
import { UpdateTemplateDto } from './dtos/update-template.dto';
import { CategoryService } from 'src/category/category.service';
import { CountTemplate } from './dtos/count-template.dto';

@Injectable()
export class TemplateService {

    constructor(
        @InjectRepository(TemplateEntity)
        private templateRepository: Repository<TemplateEntity>,
        private readonly userService: UserService,
        private readonly campoService: CampoService,
        @Inject(forwardRef(() => CategoryService))
        private readonly categoryService: CategoryService,
    
    ) { }

    async createTemplate(createTemplate: CreateTemplateDto, userId: string): Promise<TemplateEntity> {

        await this.categoryService.findCategoryById(createTemplate.categoryId)


        const userAdmin = await this.userService.getUserAdmin(userId).catch(
            () => undefined,
        );
   
        if ( !userAdmin || userAdmin.typeUser == UserType.User) {
            return this.templateRepository.save({
                ...createTemplate,
                userId,
            })
 
        } else {
            return this.templateRepository.save({
                ...createTemplate,
                userId,
                status: StatusType.Ativo
            })
        }


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

    async getTemplatesActiveWithAuthors(): Promise<TemplateEntity[]> {
        return this.templateRepository.find({
            where: {
                status: StatusType.Ativo
            },
            relations: ['user','category'],
            order: {
                createdAt: "DESC"
            }
        })
    }

    async findAllTemplatesWithAuthors(): Promise<TemplateEntity[]> {
        return this.templateRepository.find({
            relations: ['user','category'],
            order: {
                createdAt: "DESC"
            }
        })
    }


    async getTemplatesPendingWithAuthors(): Promise<TemplateEntity[]> {
        return this.templateRepository.find({
            where: {
                status: StatusType.Pendente
            },
            relations: ['user','category'],
            order: {
                createdAt: "DESC"
            }
        })
    }

    async getTemplatesInactiveWithAuthors(): Promise<TemplateEntity[]> {
        return this.templateRepository.find({
            where: {
                status: StatusType.Inativo
            },
            relations: ['user','category'],
            order: {
                createdAt: "DESC"
            }
        })

    }

    async getTemplateInactiveByUser(id: string): Promise<TemplateEntity[]> {

        await this.userService.getUserById(id);

        const template = await this.templateRepository.find({
            where: {
                userId: id,
                status: StatusType.Inativo
            },
            relations: ['campo','category'],
            order: {
                createdAt: "DESC"
            }
        });

        if (!template || template.length === 0) {
            throw new NotFoundException('Não foi encontrado Templates para este usuário');
        }

        return template;
    }


    async getTemplatePendingByUser(id: string): Promise<TemplateEntity[]> {

        await this.userService.getUserById(id);

        const template = await this.templateRepository.find({
            where: {
                userId: id,
                status: StatusType.Pendente
            },
            relations: ['campo','category'],
            order: {
                createdAt: "DESC"
            }
        });

        if (!template || template.length === 0) {
            throw new NotFoundException('Não foi encontrado Templates para este usuário');
        }

        return template;
    }

    async getTemplatesByCategory(categoryId: number): Promise<any> {
        return this.templateRepository.count({
            where: {
                categoryId: categoryId
            }
        })
    }


    async getTemplatesAtivos(): Promise<TemplateEntity[]> {
        const ativos = await this.templateRepository.find({
            where: {
                status: StatusType.Ativo,
            },
            relations: ['campo','category'],
            order: {
                createdAt: "DESC"
            }
        });

        if (!ativos || ativos.length === 0) {
            throw new NotFoundException('Não foi encontrado Templates ativos');
        }

        return ativos;
    }


    async updateStatus(templateId: number, status: StatusType): Promise<Boolean> {
        const template = await this.findTemplateById(templateId)

        template.status = status;
        this.templateRepository.save(template);

        return true
    }

    async findTemplateById (templateId: number): Promise<TemplateEntity> {
        const template = await this.templateRepository.findOne({
            where: {
                id: templateId
            }
        });

        if (!template) {
            throw new NotFoundException('Template não encontrado');
        }

        return template

    }

    async deleteTemplate(templateId: number) : Promise<DeleteResult> {
        const template = await this.findTemplateById(templateId)

        return this.templateRepository.delete({id: template.id})
    }

    async updateTemplate(updateTemplate: UpdateTemplateDto, templateId: number) : Promise<TemplateEntity> {
        const template = await this.findTemplateById(templateId)

        return this.templateRepository.save({
            ...template,
            ...updateTemplate
        })
    }



    async countProdutsByCategoryId(): Promise<CountTemplate[]> {
        return this.templateRepository
          .createQueryBuilder('template')
          .select('template.category_id, COUNT(*) as total')
          .groupBy('template.category_id')
          .getRawMany();
      }
}