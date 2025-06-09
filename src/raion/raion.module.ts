import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Raion } from './entities/raion.entity';
import { RaionController } from './raion.controller';
import { RaionService } from './raion.service';
import { Donator } from 'src/donator/entities/donator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Raion, Donator])],
  controllers: [RaionController],
  providers: [RaionService],
})
export class RaionModule {}