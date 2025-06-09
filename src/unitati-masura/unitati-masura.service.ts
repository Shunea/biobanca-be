import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateUnitatiMasuraDto } from './dto/create-unitati-masura.dto';
import { UpdateUnitatiMasuraDto } from './dto/update-unitati-masura.dto';
import { UnitatiMasura } from './entities/unitati-masura.entity';
import { Proba } from 'src/proba/entities/proba.entity';

@Injectable()
export class UnitatiMasuraService {
  constructor(
    @InjectRepository(UnitatiMasura)
    readonly repo: Repository<UnitatiMasura>,
    @InjectRepository(Proba)
    readonly probaRepo: Repository<Proba>
  ) {}

  async findAll() {
    const unitati = await this.repo.find();
    const probe = await this.probaRepo.find({ where: { unitate_masura: In(unitati.map(({ name }) => name)) } });
    const unitatiNameSet = new Set(unitati.map(({ name }) => name));

    for (const proba of probe) {
      if (unitatiNameSet.has(proba.unitate_masura)) {
        const unitate = unitati.find(({ name }) => name === proba.unitate_masura);
        unitate['utilizat'] = true;
      }
    }

    return unitati;
  }

  async findOne(id: string) {
    return await this.repo.findOne({
      where: { id },
    });
  }

  async create(createUnitatiMasuraDto: CreateUnitatiMasuraDto) {
    return await this.repo.save(createUnitatiMasuraDto);
  }

  async update(id: string, updateUnitatiMasuraDto: UpdateUnitatiMasuraDto) {
    return await this.repo.update(id, updateUnitatiMasuraDto);
  }

  async remove(id: string) {
    const stare = await this.repo.findOneBy({ id });
    const proba = await this.probaRepo.findOneBy({ unitate_masura: stare.name })

    if (proba) {
      throw new HttpException('Nu poate fi sters!', HttpStatus.BAD_REQUEST);
    }

    return await this.repo.delete(id);
  }
}
