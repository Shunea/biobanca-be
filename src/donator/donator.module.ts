import { Module } from '@nestjs/common';
import { DonatorService } from './donator.service';
import { DonatorController } from './donator.controller';
import { Donator } from './entities/donator.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedModule } from 'src/common/shared.module';

@Module({
  imports: [TypeOrmModule.forFeature([Donator]),SharedModule],
  controllers: [DonatorController],
  providers: [DonatorService],
})
export class DonatorModule {}
