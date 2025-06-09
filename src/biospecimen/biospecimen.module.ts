import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BiospecimenService } from './biospecimen.service';
import { BiospecimenController } from './biospecimen.controller';
import { Biospecimen } from './entities/biospecimen.entity';
import { Proba } from 'src/proba/entities/proba.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Biospecimen, Proba])],
  controllers: [BiospecimenController],
  providers: [BiospecimenService],
})
export class BiospecimenModule {}
