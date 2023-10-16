import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TemplateService } from './template.service';
import { CreateTemplateDto } from './dtos/createTemplate.dto';
import { TemplateEntity } from './entity/template.entity';

@Controller('template')
export class TemplateController {
    constructor(
        private readonly templateService: TemplateService
    ) {}


    @Post('/:userId')
    async createTemplate(@Body() createTemplate: CreateTemplateDto, @Param('userId') userId: number) {
        return this.templateService.createTemplate(createTemplate,userId);
    }

    @Get('/:userId')
    async getTemplateByUser(@Param('userId') userId: number) {
        return this.templateService.getTemplateByUser(userId);
    }

    @Get('/ativos')
    async getTemplatesAtivos() : Promise<TemplateEntity[]> {
        return this.templateService.getTemplatesAtivos();
    }
}
