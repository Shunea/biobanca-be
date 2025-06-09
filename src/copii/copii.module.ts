import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CopiiController } from './copii.controller';
import { CopiiService } from './copii.service';
import { Copii } from './entities/copii.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Copii])],
  controllers: [CopiiController],
  providers: [CopiiService],
})
export class CopiiModule {}
