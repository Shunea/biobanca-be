import { Module } from '@nestjs/common';
import { VarstaStareSanatateService } from './varsta-stare-sanatate.service';
import { VarstaStareSanatateController } from './varsta-stare-sanatate.controller';
import { VarstaStareSanatate } from './entities/varsta-stare-sanatate.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parinte } from 'src/parinte/entities/parinte.entity';
import { Copii } from 'src/copii/entities/copii.entity';
import { Rude } from 'src/rude/entity/rude.entity';

@Module({
  imports: [TypeOrmModule.forFeature([VarstaStareSanatate, Parinte, Copii, Rude])],
  controllers: [VarstaStareSanatateController],
  providers: [VarstaStareSanatateService]
})
export class VarstaStareSanatateModule {}
