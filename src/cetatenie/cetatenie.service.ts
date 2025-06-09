import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateCetatenieDto } from './dto/create-cetatenie.dto';
import { UpdateCetatenieDto } from './dto/update-cetatenie.dto';
import { Cetatenie } from './entities/cetatenie.entity';
import { Donator } from 'src/donator/entities/donator.entity';

@Injectable()
export class CetatenieService {
  constructor(
    @InjectRepository(Cetatenie)
    readonly repo: Repository<Cetatenie>,
    @InjectRepository(Donator)
    readonly donatorRepo: Repository<Donator>,
  ) {}

  async create(createCetatenieDto: CreateCetatenieDto) {
    const res = this.repo.create(createCetatenieDto);
    return this.repo.save(res);
  }

  async findAll() {
    const cetatenii = await this.repo.find();
    const donatori = await this.donatorRepo.find({ where: { cetatenie: In(cetatenii.map(({ name }) => name)) } });
    const cetateniiNameSet = new Set(cetatenii.map(({ name }) => name));

    for (const donator of donatori) {
      if (cetateniiNameSet.has(donator.cetatenie)) {
        const cetatenie = cetatenii.find(({ name }) => name === donator.cetatenie);
        cetatenie['utilizat'] = true;
      }
    }

    return cetatenii;
  }

  async findOne(id: string) {
    const res = await this.repo.findOne({ where: { id } });
    return res;
  }

  async update(id: string, updateCetatenieDto: UpdateCetatenieDto) {
    const res = await this.repo.update(id, updateCetatenieDto);
    return res;
  }

  async remove(id: string) {
    const cetatanie = await this.repo.findOneBy({ id });
    const donator = await this.donatorRepo.findOneBy({ cetatenie: cetatanie.name })

    if (donator) {
      throw new HttpException('Nu poate fi sters!', HttpStatus.BAD_REQUEST);
    }

    return await this.repo.delete(id);
  }
}