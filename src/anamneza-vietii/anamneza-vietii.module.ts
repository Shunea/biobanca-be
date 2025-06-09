import { Module } from '@nestjs/common';
import { AnamnezaVietiiService } from './anamneza-vietii.service';
import { AnamnezaVietiiController } from './anamneza-vietii.controller';
import { AnamnezaVietii } from './entities/anamneza-vietii.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([AnamnezaVietii])],
  controllers: [AnamnezaVietiiController],
  providers: [AnamnezaVietiiService]
})
export class AnamnezaVietiiModule {}
