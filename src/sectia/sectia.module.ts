import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sectia } from './entities/sectia.entity';
import { SectiaController } from './sectia.controller';
import { SectiaService } from './sectia.service';

@Module({
  imports: [TypeOrmModule.forFeature([Sectia])],
  controllers: [SectiaController],
  providers: [SectiaService],
})
export class SectiaModule {}
