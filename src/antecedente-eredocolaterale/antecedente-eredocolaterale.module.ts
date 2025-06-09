import { Module } from '@nestjs/common';
import { AntecedenteEredocolateraleService } from './antecedente-eredocolaterale.service';
import { AntecedenteEredocolateraleController } from './antecedente-eredocolaterale.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AntecedenteEredocolaterale } from './entities/antecedente-eredocolaterale.entity';
import { Proba } from 'src/proba/entities/proba.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AntecedenteEredocolaterale, Proba])],
  controllers: [AntecedenteEredocolateraleController],
  providers: [AntecedenteEredocolateraleService],
})
export class AntecedenteEredocolateraleModule {}
