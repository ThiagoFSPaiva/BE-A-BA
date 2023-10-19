import { Body, Controller, Get, Param, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { TemplateService } from './template.service';
import { CreateTemplateDto } from './dtos/createTemplate.dto';
import { TemplateEntity } from './entity/template.entity';
import { Roles } from 'src/decorators/role.decorator';
import { UserType } from 'src/user/enum/user-type.enum';
import { UserId } from 'src/decorators/user-id.decorator';
import { CreateCampoDto } from 'src/campo/dtos/createCampo.dto';
import { ReturnTemplateDto } from './dtos/returnTemplate.dto';


@Roles(UserType.User,UserType.Admin)
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
    async getTemplatesAtivos() : Promise<TemplateEntity[]> {
        return this.templateService.getTemplatesAtivos();
    }
}
