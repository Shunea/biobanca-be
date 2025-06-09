import { Module } from '@nestjs/common';
import { TipProiectService } from './tip-proiect.service';
import { TipProiectController } from './tip-proiect.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipProiect } from './entities/tip-proiect.entity';
import { Proba } from 'src/proba/entities/proba.entity';
import { Project } from 'src/projects/entities/project.entity';


@Module({
  imports: [TypeOrmModule.forFeature([TipProiect, Proba, Project])],
  controllers: [TipProiectController],
  providers: [TipProiectService]
})
export class TipProiectModule {}
