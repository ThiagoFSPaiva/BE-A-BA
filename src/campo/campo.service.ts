import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CampoEntity } from './entity/campo.entity';
import { Repository } from 'typeorm';
import { CreateCampoDto } from './dtos/createCampo.dto';

@Injectable()
export class CampoService {
    
    constructor(
        @InjectRepository(CampoEntity)
        private readonly campoRepository: Repository<CampoEntity>
    ) {}

    async createCampo(createCampo: CreateCampoDto, templateId: number): Promise<CampoEntity> {
        console.log(templateId)
        return this.campoRepository.save(
            {
                ...createCampo,
                templateId
            }
        );
    }

    

}
