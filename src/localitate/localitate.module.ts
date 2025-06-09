import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Localitate } from './entity/localitate.entity';
import { LocalitateController } from './localitate.controller';
import { LocalitateService } from './localitate.service';

@Module({
  imports: [TypeOrmModule.forFeature([Localitate])],
  controllers: [LocalitateController],
  providers: [LocalitateService],
})
export class LocalitateModule {}
