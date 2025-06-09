import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateEtnieDto } from './dto/create-etnie.dto';
import { UpdateEtnieDto } from './dto/update-etnie.dto';
import { Etnie } from './entities/etnie.entity';
import { Donator } from 'src/donator/entities/donator.entity';

@Injectable()
export class EtnieService {
  constructor(
    @InjectRepository(Etnie)
    readonly repo: Repository<Etnie>,
    @InjectRepository(Donator)
    readonly donatorRepo: Repository<Donator>
  ) {}

  async create(createEtnieDto: CreateEtnieDto) {
    const res = this.repo.create(createEtnieDto);
    return this.repo.save(res);
  }

  async findAll() {
    const etnii = await this.repo.find();
    const donatori = await this.donatorRepo.find({ where: { etnie: In(etnii.map(({ name }) => name)) } });
    const etniiNameSet = new Set(etnii.map(({ name }) => name));

    for (const donator of donatori) {
      if (etniiNameSet.has(donator.etnie)) {
        const etnie = etnii.find(({ name }) => name === donator.etnie);
        etnie['utilizat'] = true;
      }
    }

    return etnii;
  }

  async findOne(id: string) {
    const res = await this.repo.findOne({ where: { id } });
    return res;
  }

  async update(id: string, updateEtnieDto: UpdateEtnieDto) {
    const res = await this.repo.update(id, updateEtnieDto);
    return res;
  }

  async remove(id: string) {
    const etnie = await this.repo.findOneBy({ id });
    const donator = await this.donatorRepo.findOneBy({ etnie: etnie.name })

    if (donator) {
      throw new HttpException('Nu poate fi sters!', HttpStatus.BAD_REQUEST);
    }

    return await this.repo.delete(id);
  }
}