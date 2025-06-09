import { Module } from '@nestjs/common';
import { TipVaccinService } from './tip-vaccin.service';
import { TipVaccinController } from './tip-vaccin.controller';
import { TipVaccin } from './entities/tip-vaccin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TipVaccin])],
  controllers: [TipVaccinController],
  providers: [TipVaccinService]
})
export class TipVaccinModule {}
