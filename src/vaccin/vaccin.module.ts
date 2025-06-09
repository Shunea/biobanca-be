import { Module } from '@nestjs/common';
import { VaccinService } from './vaccin.service';
import { VaccinController } from './vaccin.controller';
import { Vaccin } from './entities/vaccin.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Vaccin])],
  controllers: [VaccinController],
  providers: [VaccinService]
})
export class VaccinModule {}
