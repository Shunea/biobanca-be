import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CelulaCutieController } from './celula-cutie.controller';
import { CelulaCutieService } from './celula-cutie.service';
import { CelulaCutie } from './entities/celula-cutie.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CelulaCutie])],
  controllers: [CelulaCutieController],
  providers: [CelulaCutieService],
  exports: [CelulaCutieService],
})
export class CelulaCutieModule {}
