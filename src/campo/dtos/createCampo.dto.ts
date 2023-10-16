import { IsBoolean, IsInt, IsOptional, IsString } from "class-validator";

export class CreateCampoDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    tipo: string;

    @IsBoolean()
    isNulo: boolean;
}