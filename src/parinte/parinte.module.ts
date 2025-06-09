import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Parinte } from './entities/parinte.entity';
import { ParinteController } from './parinte.controller';
import { ParinteService } from './parinte.service';

@Module({
  imports: [TypeOrmModule.forFeature([Parinte])],
  controllers: [ParinteController],
  providers: [ParinteService],
})
export class ParinteModule {}
