import { Module } from '@nestjs/common';
import { AnalizeService } from './analize.service';
import { AnalizeController } from './analize.controller';
import { Analize } from './entities/analize.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Analize])],
  controllers: [AnalizeController],
  providers: [AnalizeService]
})
export class AnalizeModule {}
