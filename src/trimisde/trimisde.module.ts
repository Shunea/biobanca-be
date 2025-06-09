import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrimisDe } from './entities/trimisde.entity';
import { TrimisDeController } from './trimisde.controller';
import { TrimisDeService } from './trimisde.service';

@Module({
  imports: [TypeOrmModule.forFeature([TrimisDe])],
  controllers: [TrimisDeController],
  providers: [TrimisDeService],
})
export class TrimisDeModule {}
