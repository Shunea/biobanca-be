import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Like, Repository } from 'typeorm';
import { CreateCIMXDto } from './dto/create-cimx.dto';
import { UpdateCIMXDto } from './dto/update-cimx.dto';
import { CIMX } from './entities/cimx.entity';
import { Proba } from 'src/proba/entities/proba.entity';

@Injectable()
export class CIMXService {
  constructor(
    @InjectRepository(CIMX)
    readonly repo: Repository<CIMX>,
    @InjectRepository(Proba)
    readonly probaRepo: Repository<Proba>
  ) {}

  async create(createCIMXDto: CreateCIMXDto) {
    const res = this.repo.create(createCIMXDto);
    return this.repo.save(res);
  }

  async findAll() {
    const cimixuri = await this.repo.find();

    for (let i = 0; i < cimixuri.length; i++) {
      if (!cimixuri[i].nume_cod) {
        cimixuri[i].nume_cod = cimixuri[i].code + ' - ' + cimixuri[i].name;
      }
    }

    const probe = await this.probaRepo.find();
    const cimixCodeSet = new Set();

    for (const proba of probe) {
      const cimix = cimixuri.find(({ code }) => proba.cod_si_diagnostic.includes(code));
      if (cimix) {
        cimixCodeSet.add(cimix.code);
      }
    }

    for (const cimix of cimixuri) {
      if (cimixCodeSet.has(cimix.code)) {
        cimix['utilizat'] = true;
      }
    }

    return cimixuri;
  }

  async findOne(id: string) {
    const res = await this.repo.findOne({ where: { id } });
    return res;
  }

  async update(id: string, updateRaionDto: UpdateCIMXDto) {
    const res = await this.repo.update(id, updateRaionDto);
    return res;
  }

  async remove(id: string) {
    const cimx = await this.repo.findOneBy({ id });
    const proba = await this.probaRepo.findOneBy({ cod_si_diagnostic: Like(`%${cimx.code}%`) })

    if (proba) {
      throw new HttpException('Nu poate fi sters!', HttpStatus.BAD_REQUEST);
    }

    return await this.repo.delete(id);
  }
}
