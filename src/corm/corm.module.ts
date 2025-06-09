import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CormController } from './corm.controller';
import { CormService } from './corm.service';
import { Corm } from './entities/corm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Corm])],
  controllers: [CormController],
  providers: [CormService],
})
export class CormModule {}
