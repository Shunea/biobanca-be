import { Module } from '@nestjs/common';
import { MaladiiInfectioaseService } from './maladii-infectioase.service';
import { MaladiiInfectioaseController } from './maladii-infectioase.controller';
import { MaladiiInfectioase } from './entities/maladii-infectioase.entity';
import { TypeOrmModule } from '@nestjs/typeorm';


@Module({
  imports: [TypeOrmModule.forFeature([MaladiiInfectioase])],
  controllers: [MaladiiInfectioaseController],
  providers: [MaladiiInfectioaseService]
})
export class MaladiiInfectioaseModule {}
