import { Barcode } from './entities/barcode.entity';
import { CreateBarcodeDto } from './dto/create-barcode.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { DeleteResult, In, Repository, getConnection } from 'typeorm';
import { Proba } from 'src/proba/entities/proba.entity';
import { ProbaService } from 'src/proba/proba.service';

const bwipjs = require('bwip-js');

@Injectable()
export class BarcodeService {
  private alias = "barcode";

  constructor(
    @InjectRepository(Barcode)
    private readonly barcodeRepository: Repository<Barcode>,
    @Inject(forwardRef(() => ProbaService))
    private readonly probaService: ProbaService
  ) {}

  async findAll(): Promise<Barcode[]> {
    return await this.barcodeRepository.find();
  }

  async findOneById(id: string): Promise<Barcode> {
    return await this.barcodeRepository.findOneBy({ id });
  }
  
  async findByProbaId(probaId: string): Promise<Barcode[]> {
    return await this.barcodeRepository.findBy({ probaId });
  }

  async create(createBarcodeDto: CreateBarcodeDto): Promise<Barcode[]> {
    try {
      const proba = await this.probaService.findOne(createBarcodeDto.probaId);
  
      if (!proba) {
        throw new HttpException("Proba was not found!", HttpStatus.NOT_FOUND);
      }
  
      const barcodes = await this.createBarcodes(proba);
      
      return await this.barcodeRepository.save(barcodes);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async deleteById(id: string): Promise<DeleteResult> {
    return await this.barcodeRepository.delete(id);
  }
  
  async deleteByIds(ids: number[]): Promise<DeleteResult> {
    return await this.barcodeRepository
      .createQueryBuilder(this.alias)
      .delete()
      .from(Barcode)
      .where({ id: In(ids) })
      .execute()
  }

  private async createBarcodes(proba: Partial<Proba>): Promise<Partial<Barcode>[]> {
    const { probe_alicotate = [], donator, data_prelevarii, nume_proba, statutul_probei, cantitate_proba, nr_proba, biospecimen_prelevat } = proba;
    const probaData = {
      data_prelevarii,
      idnp_donator: donator?.IDNP,
      nr_proba,
      nume_proba,
      statutul_probei,
      cantitate_proba,
      nume_donator: `${donator?.nume} ${donator?.prenume}`,
      tip_biospecimen: biospecimen_prelevat
    };
  
    const probaBarcode = await this.generateBarcode(probaData);
  
    const barcodes = [{
      data: probaBarcode.toString("base64"),
      probaId: proba.id,
      probaName: proba.nume_proba
    }];
  
    if (probe_alicotate.length > 0) {
      const barcodeAlicotateObjects = [];
      
      for (const { name: nume_proba, id: probaAlicotataId } of probe_alicotate) {
        const barcodeDataWithAlicotate = { ...probaData, nume_proba };
        const probaAlicotataBarcode = await this.generateBarcode(barcodeDataWithAlicotate);

        barcodeAlicotateObjects.push({ data: probaAlicotataBarcode.toString("base64"), probaId: proba.id, probaAlicotataId, probaName: nume_proba });
      }

      barcodes.push(...barcodeAlicotateObjects);
    }

    return barcodes;
  }
  
  private async generateBarcode(data: any): Promise<Buffer> {
    return await bwipjs.toBuffer({
      bcid: 'pdf417',
      text: JSON.stringify(data),
    });
  }
}
