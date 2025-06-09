import { Module } from '@nestjs/common';
import { EtnieService } from './etnie.service';
import { EtnieController } from './etnie.controller';
import { Etnie } from './entities/etnie.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Donator } from 'src/donator/entities/donator.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Etnie, Donator])],
  controllers: [EtnieController],
  providers: [EtnieService]
})
export class EtnieModule {}
