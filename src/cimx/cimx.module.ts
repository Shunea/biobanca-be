import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CIMXController } from './cimx.controller';
import { CIMXService } from './cimx.service';
import { CIMX } from './entities/cimx.entity';
import { Proba } from 'src/proba/entities/proba.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CIMX, Proba])],
  controllers: [CIMXController],
  providers: [CIMXService],
})
export class CIMXModule {}
