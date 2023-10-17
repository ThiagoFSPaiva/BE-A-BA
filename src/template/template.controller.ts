import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { TemplateService } from './template.service';
import { CreateTemplateDto } from './dtos/createTemplate.dto';
import { TemplateEntity } from './entity/template.entity';

@Controller('template')
export class TemplateController {
    constructor(
        private readonly templateService: TemplateService
    ) {}

    @Post('criar-template/:userId')
    async createTemplate(@Body() createTemplate: CreateTemplateDto, @Param('userId') userId: number) {
        return this.templateService.createTemplate(createTemplate,userId);
    }

    @Get('listar-templates-por-id/:userId')
    async getTemplateByUser(@Param('userId') userId: number) {
        return this.templateService.getTemplateByUser(userId);
    }

    @Get('/listar-templates-ativos')
    async getTemplatesAtivos() : Promise<TemplateEntity[]> {
        return this.templateService.getTemplatesAtivos();
    }
}
