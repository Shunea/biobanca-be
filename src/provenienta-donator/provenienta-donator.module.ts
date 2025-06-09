import { Module } from '@nestjs/common';
import { ProvenientaDonatorService } from './provenienta-donator.service';
import { ProvenientaDonatorController } from './provenienta-donator.controller';
import { ProvenientaDonator } from './entities/provenienta-donator.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donator } from 'src/donator/entities/donator.entity';


@Module({
  imports: [TypeOrmModule.forFeature([ProvenientaDonator, Donator])],
  controllers: [ProvenientaDonatorController],
  providers: [ProvenientaDonatorService]
})
export class ProvenientaDonatorModule {}
