import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivationCodesController } from './activation-codes.controller';
import { ActivationCodesService } from './activation-codes.service';
import { ActivationCodes } from './entities/activation-codes.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ActivationCodes])],
  exports: [TypeOrmModule, ActivationCodesService],
  providers: [ActivationCodesService],
  controllers: [ActivationCodesController],
})
export class ActivationCodesModule {}
