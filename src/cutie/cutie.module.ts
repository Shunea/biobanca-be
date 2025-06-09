import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CelulaCutieModule } from 'src/celula-cutie/celula-cutie.module';
import { CutieController } from './cutie.controller';
import { CutieService } from './cutie.service';
import { Cutie } from './entities/cutie.entity';
import { Proba } from 'src/proba/entities/proba.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cutie, Proba]), CelulaCutieModule],
  controllers: [CutieController],
  providers: [CutieService],
})
export class CutieModule {}
