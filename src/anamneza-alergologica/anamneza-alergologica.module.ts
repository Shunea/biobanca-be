import { Module } from '@nestjs/common';
import { AnamnezaAlergologicaService } from './anamneza-alergologica.service';
import { AnamnezaAlergologicaController } from './anamneza-alergologica.controller';
import { AnamnezaAlergologica } from './entities/anamneza-alergologica.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proba } from 'src/proba/entities/proba.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AnamnezaAlergologica, Proba])],
  controllers: [AnamnezaAlergologicaController],
  providers: [AnamnezaAlergologicaService]
})
export class AnamnezaAlergologicaModule {}
