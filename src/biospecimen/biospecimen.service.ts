import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateBiospecimenDto } from './dto/create-biospecimen.dto';
import { UpdateBiospecimenDto } from './dto/update-biospecimen.dto';
import { Biospecimen } from './entities/biospecimen.entity';
import { Proba } from 'src/proba/entities/proba.entity';

@Injectable()
export class BiospecimenService {
  constructor(
    @InjectRepository(Biospecimen)
    readonly repo: Repository<Biospecimen>,
    @InjectRepository(Proba)
    readonly probaRepo: Repository<Proba>
  ) {}

  async findAll() {
    const biospecimene = await this.repo.find();
    const probe = await this.probaRepo.find({ where: { biospecimen_prelevat: In(biospecimene.map(({ name }) => name)) } });
    const biospecimeneNameSet = new Set(biospecimene.map(({ name }) => name));

    for (const proba of probe) {
      if (biospecimeneNameSet.has(proba.biospecimen_prelevat)) {
        const biospecimen = biospecimene.find(({ name }) => name === proba.biospecimen_prelevat);
        biospecimen['utilizat'] = true;
      }
    }

    return biospecimene;
  }

  async findOne(id: string) {
    return await this.repo.findOne({
      where: { id },
    });
  }

  async create(createBiospecimenDto: CreateBiospecimenDto) {
    return await this.repo.save(createBiospecimenDto);
  }

  async update(id: string, updateBiospecimenDto: UpdateBiospecimenDto) {
    return await this.repo.update(id, updateBiospecimenDto);
  }

  async remove(id: string) {
    const biospecimen = await this.repo.findOneBy({ id });
    const proba = await this.probaRepo.findOneBy({ biospecimen_prelevat: biospecimen.name })

    if (proba) {
      throw new HttpException('Nu poate fi sters!', HttpStatus.BAD_REQUEST);
    }

    return await this.repo.delete(id);
  }
}
