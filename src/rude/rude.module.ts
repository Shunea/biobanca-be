import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rude } from './entity/rude.entity';
import { RudeController } from './rude.controller';
import { RudeService } from './rude.service';

@Module({
  imports: [TypeOrmModule.forFeature([Rude])],
  controllers: [RudeController],
  providers: [RudeService],
})
export class RudeModule {}
