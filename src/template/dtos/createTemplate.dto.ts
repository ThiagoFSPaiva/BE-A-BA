import { Type } from "class-transformer";
import { IsArray, IsString, ValidateNested } from "class-validator";
import { CreateCampoDto } from "src/campo/dtos/createCampo.dto";

export class CreateTemplateDto {

    @IsString()
    name: string;

    @IsString()
    extensao: string;


    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreateCampoDto)
    campo: Array<CreateCampoDto>;

}