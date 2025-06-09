import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Statut } from './entities/statut.entity';
import { StatutController } from './statut.controller';
import { StatutService } from './statut.service';
import { Donator } from 'src/donator/entities/donator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Statut, Donator])],
  controllers: [StatutController],
  providers: [StatutService],
})
export class StatutModule {}
