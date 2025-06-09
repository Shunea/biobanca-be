import { Module } from '@nestjs/common';
import { TipProbaService } from './tip-proba.service';
import { TipProbaController } from './tip-proba.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipProba } from './entity/tip-proba.entity';
import { Proba } from 'src/proba/entities/proba.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipProba, Proba])],
  controllers: [TipProbaController],
  providers: [TipProbaService]
})
export class TipProbaModule {}
