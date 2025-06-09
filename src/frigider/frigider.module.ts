import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Frigider } from './entities/frigider.entity';
import { FrigiderController } from './frigider.controller';
import { FrigiderService } from './frigider.service';

@Module({
  imports: [TypeOrmModule.forFeature([Frigider])],
  controllers: [FrigiderController],
  providers: [FrigiderService],
})
export class FrigiderModule {}
