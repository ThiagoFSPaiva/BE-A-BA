import { Body, Controller, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { TemplateService } from './template.service';
import { CreateTemplateDto } from './dtos/createTemplate.dto';
import { TemplateEntity } from './entity/template.entity';
import { Roles } from 'src/decorators/role.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { UserId } from 'src/decorators/user-id.decorator';
import { ReturnTemplateDto } from './dtos/returnTemplate.dto';
import { ReturnTemplateAdminDto } from './dtos/returnTemplateAdmin.dto';
import { StatusType } from 'src/user/enum/status-type.enum';


@Controller('template')
export class TemplateController {
    constructor(
        private readonly templateService: TemplateService
    ) {}

    @Post('criar-template')
    @UsePipes(ValidationPipe)
    async createTemplateWithCampos(@Body() createTemplate: CreateTemplateDto, @UserId() userId: number) {
        console.log(userId, 'userId');
        return this.templateService.createTemplateWithFields(createTemplate,userId); 
    }

    @Get('listar-templates-por-id')
    async getTemplateByUser(@UserId() userId: number): Promise<ReturnTemplateDto[]> {
        return (await this.templateService.getTemplateByUser(userId)).map(template => new ReturnTemplateDto(template));
    }
    
    @Get('/listar-templates-ativos')
    async getTemplatesAtivos() : Promise<ReturnTemplateDto[]> {
        return (await this.templateService.getTemplatesAtivos()).map(template => new ReturnTemplateDto(template));
    }

    @Roles(UserType.Admin)
    @Get('ativos')
    async findAllActiveTemplatesWithAuthors(): Promise<ReturnTemplateAdminDto[]> {
      return (await this.templateService.findAllActiveTemplatesWithAuthors()).map(template => new ReturnTemplateAdminDto(template));
    }

    @Patch(':id')
    async updateStatus(@Param('id') id: number, @Body() body: { status: StatusType }) {
      const { status } = body;
      return this.templateService.updateStatus(id, status);
    }
}
