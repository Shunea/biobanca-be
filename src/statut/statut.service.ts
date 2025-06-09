import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateStatutDto } from './dto/create-statut.dto';
import { UpdateStatutDto } from './dto/update-statut.dto';
import { Statut } from './entities/statut.entity';
import { Donator } from 'src/donator/entities/donator.entity';

@Injectable()
export class StatutService {
  constructor(
    @InjectRepository(Statut)
    readonly repo: Repository<Statut>,
    @InjectRepository(Donator)
    readonly donatorRepo: Repository<Donator>
  ) {}

  async create(createStatutDto: CreateStatutDto) {
    const statut = this.repo.create(createStatutDto);
    return await this.repo.save(statut);
  }

  async findAll() {
    const statuturi = await this.repo.find();
    const donatori = await this.donatorRepo.find({ where: { statut: In(statuturi.map(({ name }) => name)) } });
    const statuturiNameSet = new Set(statuturi.map(({ name }) => name));

    for (const donator of donatori) {
      if (statuturiNameSet.has(donator.statut)) {
        const statut = statuturi.find(({ name }) => name === donator.statut);
        statut['utilizat'] = true;
      }
    }

    return statuturi;
  }

  async findOne(id: string) {
    return await this.repo.findOne({ where: { id } });
  }

  async update(id: string, updateStatutDto: UpdateStatutDto) {
    return await this.repo.update(id, updateStatutDto);
  }

  async remove(id: string) {
    const statut = await this.repo.findOneBy({ id });
    const donator = await this.donatorRepo.findOneBy({ statut: statut.name })

    if (donator) {
      throw new HttpException('Nu poate fi sters!', HttpStatus.BAD_REQUEST);
    }

    return await this.repo.delete(id);
  }
}
