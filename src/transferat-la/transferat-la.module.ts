import { Module } from '@nestjs/common';
import { TransferatLaService } from './transferat-la.service';
import { TransferatLaController } from './transferat-la.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransferatLa } from './entity/transferat-la.entity';
import { Proba } from 'src/proba/entities/proba.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TransferatLa, Proba])],
  controllers: [TransferatLaController],
  providers: [TransferatLaService]
})
export class TransferatLaModule {}
