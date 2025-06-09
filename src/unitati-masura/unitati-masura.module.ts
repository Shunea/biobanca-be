import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitatiMasura } from './entities/unitati-masura.entity';
import { UnitatiMasuraController } from './unitati-masura.controller';
import { UnitatiMasuraService } from './unitati-masura.service';
import { Proba } from 'src/proba/entities/proba.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UnitatiMasura, Proba])],
  controllers: [UnitatiMasuraController],
  providers: [UnitatiMasuraService],
})
export class UnitatiMasuraModule {}
