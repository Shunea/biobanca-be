import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GrupaSangvinaService } from './grupa-sangvina.service';
import { GrupaSangvinaController } from './grupa-sangvina.controller';
import { GrupaSangvina } from './entities/grupa-sangvina.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GrupaSangvina])],
  controllers: [GrupaSangvinaController],
  providers: [GrupaSangvinaService],
})
export class GrupaSangvinaModule {}
