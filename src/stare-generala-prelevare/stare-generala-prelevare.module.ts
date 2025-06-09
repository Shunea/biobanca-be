import { Module } from '@nestjs/common';
import { StareGeneralaPrelevareService } from './stare-generala-prelevare.service';
import { StareGeneralaPrelevareController } from './stare-generala-prelevare.controller';
import { StareGeneralaPrelevare } from './entities/stare-generala-prelevare.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proba } from 'src/proba/entities/proba.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StareGeneralaPrelevare, Proba])],
  controllers: [StareGeneralaPrelevareController],
  providers: [StareGeneralaPrelevareService]
})
export class StareGeneralaPrelevareModule {}
