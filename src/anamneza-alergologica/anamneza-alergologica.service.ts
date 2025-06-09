import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateAnamnezaAlergologicaDto } from './dto/create-anamneza-alergologica.dto';
import { UpdateAnamnezaAlergologicaDto } from './dto/update-anamneza-alergologica.dto';
import { AnamnezaAlergologica } from './entities/anamneza-alergologica.entity';
import { Proba } from 'src/proba/entities/proba.entity';

@Injectable()
export class AnamnezaAlergologicaService {
  constructor(
    @InjectRepository(AnamnezaAlergologica)
    readonly repo: Repository<AnamnezaAlergologica>,
    @InjectRepository(Proba)
    readonly probaRepo: Repository<Proba>
  ) {}

  async findAll() {
    const anamneze = await this.repo.find();
    const probe = await this.probaRepo.find({ where: { anamneza_alergologica: In(anamneze.map(({ name }) => name)) } });
    const anamnezeNameSet = new Set(anamneze.map(({ name }) => name));

    for (const proba of probe) {
      if (anamnezeNameSet.has(proba.anamneza_alergologica)) {
        const anamneza = anamneze.find(({ name }) => name === proba.anamneza_alergologica);
        anamneza['utilizat'] = true;
      }
    }

    return anamneze;
  }

  async findOne(id: string) {
    return await this.repo.findOne({
      where: { id },
    });
  }

  async create(createAnamnezaAlergologicaDto: CreateAnamnezaAlergologicaDto) {
    return await this.repo.save(createAnamnezaAlergologicaDto);
  }

  async update(id: string, updateAnamnezaAlergologicaDto: UpdateAnamnezaAlergologicaDto) {
    return await this.repo.update(id, updateAnamnezaAlergologicaDto);
  }

  async remove(id: string) {
    const anamneza = await this.repo.findOneBy({ id });
    const proba = await this.probaRepo.findOneBy({ anamneza_alergologica: anamneza.name })

    if (proba) {
      throw new HttpException('Nu poate fi sters!', HttpStatus.BAD_REQUEST);
    }

    return await this.repo.delete(id);
  }
}
