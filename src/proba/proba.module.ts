import { Global, Module, forwardRef } from '@nestjs/common';
import { ProbaService } from './proba.service';
import { ProbaController } from './proba.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Proba } from './entities/proba.entity';
import { SharedModule } from 'src/common/shared.module';
import { BarcodeModule } from 'src/barcode/barcode.module';
import { BarcodeService } from 'src/barcode/barcode.service';
import { Barcode } from 'src/barcode/entities/barcode.entity';
import { ProbaAlicotataModule } from 'src/proba-alicotata/proba-alicotata.module';
import { ProbaAlicotataService } from 'src/proba-alicotata/proba-alicotata.service';
import { ProbaAlicotata } from 'src/proba-alicotata/entities/proba-alicotata.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Proba, Barcode, ProbaAlicotata]),
    SharedModule,
    forwardRef(() => BarcodeModule),
    forwardRef(() => ProbaAlicotataModule)
  ],
  controllers: [ProbaController],
  providers: [ProbaService, BarcodeService, ProbaAlicotataService],
  exports: [ProbaService, BarcodeService, ProbaAlicotataService]
})
export class ProbaModule {}
