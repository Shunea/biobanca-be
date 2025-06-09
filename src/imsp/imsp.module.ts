import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Imsp } from './entities/imsp.entity';
import { ImspController } from './imsp.controller';
import { ImspService } from './imsp.service';
import { Proba } from 'src/proba/entities/proba.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Imsp, Proba])],
  controllers: [ImspController],
  providers: [ImspService],
  exports: [ImspService],
})
export class ImspModule {}
