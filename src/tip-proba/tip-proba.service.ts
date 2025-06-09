import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, In, Repository, UpdateResult } from 'typeorm';
import { CreateTipProbaDto } from './dto/create-tip-proba.dto';
import { UpdateTipProbaDto } from './dto/update-tip-proba.dto';
import { TipProba } from './entity/tip-proba.entity';
import { Proba } from 'src/proba/entities/proba.entity';


@Injectable()
export class TipProbaService {
  constructor(
    @InjectRepository(TipProba)
    readonly repo: Repository<TipProba>,
    @InjectRepository(Proba)
    readonly probaRepo: Repository<Proba>
  ) {}

  async findAll(): Promise<TipProba[]> {
    const tipuriProba = await this.repo.find();
    const probe = await this.probaRepo.find({ where: { tip_proba: In(tipuriProba.map(({ name }) => name)) } });
    const tipuriProbaNameSet = new Set(tipuriProba.map(({ name }) => name));

    for (const proba of probe) {
      if (tipuriProbaNameSet.has(proba.tip_proba)) {
        const tipProba = tipuriProba.find(({ name }) => name === proba.tip_proba);
        tipProba['utilizat'] = true;
      }
    }

    return tipuriProba;
  }

  async findOne(id: string): Promise<TipProba> {
    return await this.repo.findOne({
      where: { id },
    });
  }

  async create(createTipProbaDto: CreateTipProbaDto): Promise<TipProba> {
    const res = await this.repo.save(createTipProbaDto);
    return res;
  }

  async update(
    id: string,
    updateTipProbaDto: UpdateTipProbaDto,
  ): Promise<UpdateResult> {
    const res = await this.repo.update(id, updateTipProbaDto);
    return res;
  }

  async remove(id: string): Promise<DeleteResult> {
    const tipProba = await this.repo.findOneBy({ id });
    const proba = await this.probaRepo.findOneBy({ tip_proba: tipProba.name })

    if (proba) {
      throw new HttpException('Nu poate fi sters!', HttpStatus.BAD_REQUEST);
    }

    return await this.repo.delete(id);
  }
}
