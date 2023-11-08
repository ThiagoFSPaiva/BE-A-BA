import { IsArray, IsBoolean, IsInt, IsNotEmpty, IsOptional, IsString, Length, isBoolean } from "class-validator";

export class CreateCampoDto {


    @IsString()
    @IsOptional()
    @IsNotEmpty({ message: 'Nome não pode ser vazio' })
    name: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty({ message: 'Nome do campo não pode ser vazio' })
    tipo: string;

    @IsBoolean()
    @IsOptional()
    isNull: boolean;
}