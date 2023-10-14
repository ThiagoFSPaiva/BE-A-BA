import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TemplateEntity } from './entity/template.entity';
import { Repository } from 'typeorm';
import { CreateTemplateDto } from './dtos/createTemplate.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class TemplateService {

    constructor(
        @InjectRepository(TemplateEntity)
        private templateRepository: Repository<TemplateEntity>,
        private readonly userService: UserService
    ) {}

    async createTemplate(createTemplate: CreateTemplateDto,userId: number): Promise<TemplateEntity> {
        return this.templateRepository.save({
            ...createTemplate,
            userId
        });
        
    }
    async getTemplateByUser(id: number): Promise<TemplateEntity> {

        await this.userService.getUserById(id);
    
        return this.templateRepository.findOne({
            where: {
                userId: id
            },
        });
    }

}
