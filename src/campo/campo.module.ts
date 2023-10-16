import { Module } from '@nestjs/common';
import { CampoController } from './campo.controller';
import { CampoService } from './campo.service';
import { CampoEntity } from './entity/campo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([CampoEntity]),
  ],
  controllers: [CampoController],
  providers: [CampoService]
})
export class CampoModule {}
