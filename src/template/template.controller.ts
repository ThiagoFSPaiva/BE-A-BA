import { Body, Controller, Delete, Get, Param, Patch, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { TemplateService } from './template.service';
import { CreateTemplateDto } from './dtos/createTemplate.dto';
import { Roles } from 'src/decorators/role.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { UserId } from 'src/decorators/user-id.decorator';
import { ReturnTemplateDto } from './dtos/returnTemplate.dto';
import { ReturnTemplateAdminDto } from './dtos/returnTemplateAdmin.dto';
import { StatusType } from 'src/user/enum/status-type.enum';
import { DeleteResult } from 'typeorm';
import { UpdateTemplateDto } from './dtos/update-template.dto';
import { TemplateEntity } from './entity/template.entity';


@Controller('template')
export class TemplateController {
    constructor(
        private readonly templateService: TemplateService
    ) {}

    @Post('criar-template')
    @UsePipes(ValidationPipe)
    async createTemplateWithCampos(@Body() createTemplate: CreateTemplateDto, @UserId() userId: string): Promise<TemplateEntity> {
        return await this.templateService.createTemplateWithFields(createTemplate,userId); 
    }

    @Get('meus-templates-pendentes')
    async getTemplatePendingByUser(@UserId() userId: string): Promise<ReturnTemplateAdminDto[]> {
        return (await this.templateService.getTemplatePendingByUser(userId)).map(template => new ReturnTemplateAdminDto(template));
    }

    @Get('meus-templates-inativos')
    async getTemplateInactiveByUser(@UserId() userId: string): Promise<ReturnTemplateDto[]> {
        return (await this.templateService.getTemplateInactiveByUser(userId)).map(template => new ReturnTemplateDto(template));
    }
    
    @Get('/listar-templates-ativos')
    async getTemplatesAtivos() : Promise<ReturnTemplateDto[]> {
        return (await this.templateService.getTemplatesAtivos()).map(template => new ReturnTemplateDto(template));
    }

    @Roles(UserType.Admin)
    @Get('ativos')
    async findAllActiveTemplatesWithAuthors(): Promise<ReturnTemplateAdminDto[]> {
      return (await this.templateService.getTemplatesActiveWithAuthors()).map(template => new ReturnTemplateAdminDto(template));
    }

    @Roles(UserType.Admin)
    @Get('all')
    async findAllTemplatesWithAuthors(): Promise<ReturnTemplateAdminDto[]> {
      return (await this.templateService.findAllTemplatesWithAuthors()).map(template => new ReturnTemplateAdminDto(template));
    }

    @Roles(UserType.Admin)
    @Get('pendentes')
    async findAllPendingTemplatesWithAuthors(): Promise<ReturnTemplateAdminDto[]> {
      return (await this.templateService.getTemplatesPendingWithAuthors()).map(template => new ReturnTemplateAdminDto(template));
    }


    @Roles(UserType.Admin)
    @Get('inativos')
    async findAllInactiveTemplatesWithAuthors(): Promise<ReturnTemplateAdminDto[]> {
      return (await this.templateService.getTemplatesInactiveWithAuthors()).map(template => new ReturnTemplateAdminDto(template));
    }

    @Patch(':id')
    async updateStatus(@Param('id') id: number, @Body() body: { status: StatusType }) {
      const { status } = body;
      return this.templateService.updateStatus(id, status); 
    }


    @Roles(UserType.Admin)
    @Delete('/:templateId')
    @UsePipes(ValidationPipe)
    async deleteTemplate( @Param('templateId') templateId: number): Promise<DeleteResult> {
        return this.templateService.deleteTemplate(templateId); 
    }

    @Roles(UserType.Admin)
    @Put('/:templateId')
    @UsePipes(ValidationPipe)
    async updateTemplate(@Body() updateTemplate: UpdateTemplateDto, @Param('templateId') templateId: number): Promise<TemplateEntity> {
        return this.templateService.updateTemplate(updateTemplate,templateId); 
    }
}
