import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, In, Repository, UpdateResult } from 'typeorm';
import { CreateTipProiectDto } from './dto/create-tip-proiect.dto';
import { UpdateTipProiectDto } from './dto/update-tip-proiect.dto';
import { TipProiect } from './entities/tip-proiect.entity';
import { Proba } from 'src/proba/entities/proba.entity';
import { Project } from 'src/projects/entities/project.entity';


@Injectable()
export class TipProiectService {
  constructor(
    @InjectRepository(TipProiect)
    readonly repo: Repository<TipProiect>,
    @InjectRepository(Proba)
    readonly probaRepo: Repository<Proba>,
    @InjectRepository(Project)
    readonly projectRepo: Repository<Project>
  ) {}

  async findAll(): Promise<TipProiect[]> {
    const tipuriProiect = await this.repo.find();
    const proiecte = await this.projectRepo.find({ where: { tip: In(tipuriProiect.map(({ name }) => name)) } });
    const probe = await this.probaRepo.find({ where: { project_id: In(proiecte.map(({ id }) => id)) } });
    const proiecteIdSet = new Set(proiecte.map(({ id }) => id));

    for (const tipProiect of tipuriProiect) {
      const proiect = proiecte.find((proiect) => proiect.tip === tipProiect.name);
      if (proiect) {
        tipProiect["project_id"] = proiect.id;
      }
    }

    for (const proba of probe) {
      if (proiecteIdSet.has(proba.project_id)) {
        const tipProiect = tipuriProiect.find((tipProiect) => tipProiect["project_id"] === proba.project_id);
        tipProiect['utilizat'] = true;
      }
    }

    return tipuriProiect;
  }

  async findOne(id: string): Promise<TipProiect> {
    return await this.repo.findOne({
      where: { id },
    });
  }

  async create(createTipProiectDto: CreateTipProiectDto): Promise<TipProiect> {
    const res = await this.repo.save(createTipProiectDto);
    return res;
  }

  async update(
    id: string,
    updateTipProiectDto: UpdateTipProiectDto,
  ): Promise<UpdateResult> {
    const res = await this.repo.update(id, updateTipProiectDto);
    return res;
  }

  async remove(id: string): Promise<DeleteResult> {
    const tipProiect = await this.repo.findOneBy({ id });
    const proiect = await this.projectRepo.findOneBy({ tip: tipProiect.name });
    const proba = await this.probaRepo.findOneBy({ project_id: proiect.id })

    if (proba) {
      throw new HttpException('Nu poate fi sters!', HttpStatus.BAD_REQUEST);
    }

    return await this.repo.delete(id);
  }
}
