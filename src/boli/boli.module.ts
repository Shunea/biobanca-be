import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoliController } from './boli.controller';
import { BoliService } from './boli.service';
import { Boli } from './entities/boli.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Boli])],
  controllers: [BoliController],
  providers: [BoliService],
})
export class BoliModule {}
