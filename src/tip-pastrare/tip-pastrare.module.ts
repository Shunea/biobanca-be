import { Module } from '@nestjs/common';
import { TipPastrareService } from './tip-pastrare.service';
import { TipPastrareController } from './tip-pastrare.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipPastrare } from './entities/tip-pastrare.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipPastrare])],
  controllers: [TipPastrareController],
  providers: [TipPastrareService]
})
export class TipPastrareModule {}
