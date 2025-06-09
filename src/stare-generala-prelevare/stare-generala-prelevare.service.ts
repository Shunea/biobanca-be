import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateStareGeneralaPrelevareDto } from './dto/create-stare-generala-prelevare.dto';
import { UpdateStareGeneralaPrelevareDto } from './dto/update-stare-generala-prelevare.dto';
import { StareGeneralaPrelevare } from './entities/stare-generala-prelevare.entity';
import { Proba } from 'src/proba/entities/proba.entity';

@Injectable()
export class StareGeneralaPrelevareService {
  constructor(
    @InjectRepository(StareGeneralaPrelevare)
    readonly repo: Repository<StareGeneralaPrelevare>,
    @InjectRepository(Proba)
    readonly probaRepo: Repository<Proba>
  ) {}

  async create(createStareGeneralaPrelevareDto: CreateStareGeneralaPrelevareDto) {
    const res = this.repo.create(createStareGeneralaPrelevareDto);
    return this.repo.save(res);
  }

  async findAll() {
    const stari = await this.repo.find();
    const probe = await this.probaRepo.find({ where: { stare_generala: In(stari.map(({ name }) => name)) } });
    const stariNameSet = new Set(stari.map(({ name }) => name));

    for (const proba of probe) {
      if (stariNameSet.has(proba.stare_generala)) {
        const stare = stari.find(({ name }) => name === proba.stare_generala);
        stare['utilizat'] = true;
      }
    }

    return stari;
  }

  async findOne(id: string) {
    const res = await this.repo.findOne({ where: { id } });
    return res;
  }

  async update(id: string, updateStareGeneralaPrelevareDto: UpdateStareGeneralaPrelevareDto) {
    const res = await this.repo.update(id, updateStareGeneralaPrelevareDto);
    return res;
  }

  async remove(id: string) {
    const stare = await this.repo.findOneBy({ id });
    const proba = await this.probaRepo.findOneBy({ stare_generala: stare.name })

    if (proba) {
      throw new HttpException('Nu poate fi sters!', HttpStatus.BAD_REQUEST);
    }

    return await this.repo.delete(id);
  }
}