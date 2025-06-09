import { Global, Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BarcodeController } from './barcode.controller';
import { BarcodeService } from './barcode.service';
import { Barcode } from './entities/barcode.entity';
import { ProbaModule } from 'src/proba/proba.module';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([Barcode]),
    forwardRef(() => ProbaModule),
  ],
  controllers: [BarcodeController],
  providers: [BarcodeService],
  exports: [BarcodeService],
})

export class BarcodeModule {}
