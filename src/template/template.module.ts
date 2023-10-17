import { Module } from '@nestjs/common';
import { TemplateService } from './template.service';
import { TemplateController } from './template.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemplateEntity } from './entity/template.entity';
import { UserModule } from 'src/user/user.module';
import { CampoModule } from 'src/campo/campo.module';

@Module({
  imports: [
    CampoModule,
    UserModule,
    TypeOrmModule.forFeature([TemplateEntity])
  ],
  providers: [TemplateService],
  controllers: [TemplateController]
})
export class TemplateModule {}
