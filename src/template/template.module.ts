import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplateEntity } from './entity/template.entity';
import { UserModule } from 'src/user/user.module';
import { CampoModule } from 'src/campo/campo.module';
import { CampoEntity } from 'src/campo/entity/campo.entity';
import { CategoryEntity } from 'src/category/entity/category.entity';
import { CategoryModule } from 'src/category/category.module';

@Module({
  imports: [
    CampoModule,
    UserModule,
    CategoryModule,
    TypeOrmModule.forFeature([TemplateEntity,CampoEntity,CategoryEntity])
  ],
  providers: [TemplateService],
  controllers: [TemplateController]
})
export class TemplateModule {}
