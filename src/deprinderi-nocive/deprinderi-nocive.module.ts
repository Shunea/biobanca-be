import { Module } from '@nestjs/common';
import { DeprinderiNociveService } from './deprinderi-nocive.service';
import { DeprinderiNociveController } from './deprinderi-nocive.controller';
import { DeprinderiNocive } from './entities/deprinderi-nocive.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([DeprinderiNocive])],
  controllers: [DeprinderiNociveController],
  providers: [DeprinderiNociveService]
})
export class DeprinderiNociveModule {}
