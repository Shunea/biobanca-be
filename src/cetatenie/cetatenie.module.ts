import { Module } from '@nestjs/common';
import { CetatenieService } from './cetatenie.service';
import { CetatenieController } from './cetatenie.controller';
import { Cetatenie } from './entities/cetatenie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donator } from 'src/donator/entities/donator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cetatenie, Donator])],
  controllers: [CetatenieController],
  providers: [CetatenieService]
})
export class CetatenieModule {}
