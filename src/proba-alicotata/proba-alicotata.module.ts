import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProbaAlicotata } from './entities/proba-alicotata.entity';
import { ProbaAlicotataController } from './proba-alicotata.controller';
import { ProbaAlicotataService } from './proba-alicotata.service';
import { ProbaModule } from 'src/proba/proba.module';

@Module({
  imports: [TypeOrmModule.forFeature([ProbaAlicotata]),
    forwardRef(() => ProbaModule)
  ],
  controllers: [ProbaAlicotataController],
  providers: [ProbaAlicotataService],
  exports: [ProbaAlicotataService],
})
export class ProbaAlicotataModule {}
