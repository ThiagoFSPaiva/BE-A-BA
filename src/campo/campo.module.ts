import { Module } from '@nestjs/common';
import { CampoService } from './campo.service';
import { CampoEntity } from './entity/campo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([CampoEntity]),
  ],
  providers: [CampoService],
  exports: [CampoService]
})
export class CampoModule {}
