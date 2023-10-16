import { Body, Controller, Param, Post } from '@nestjs/common';
import { CampoService } from './campo.service';
import { CampoEntity } from './entity/campo.entity';
import { CreateCampoDto } from './dtos/createCampo.dto';

@Controller('campo')
export class CampoController {

    constructor(
        private readonly campoService: CampoService
    ){}

    @Post('/:templateId')
    async createCampo(@Body() createCampo: CreateCampoDto, @Param('templateId') templateId: number ): Promise<CampoEntity> {
        return this.campoService.createCampo(createCampo,templateId);
    }
}
