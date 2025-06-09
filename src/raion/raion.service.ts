import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateRaionDto } from './dto/create-raion.dto';
import { UpdateRaionDto } from './dto/update-raion.dto';
import { Raion } from './entities/raion.entity';
import { Donator } from 'src/donator/entities/donator.entity';

@Injectable()
export class RaionService {
  constructor(
    @InjectRepository(Raion)
    readonly repo: Repository<Raion>,
    @InjectRepository(Donator)
    readonly donatorRepo: Repository<Donator>
  ) {}

  async create(createRaionDto: CreateRaionDto) {
    const res = this.repo.create(createRaionDto);
    return this.repo.save(res);
  }

  async findAll() {
    const raioane = await this.repo.find();
    const donatori = await this.donatorRepo.find({ where: { rp_mn: In(raioane.map(({ name }) => name)) } });
    const raioaneNameSet = new Set(raioane.map(({ name }) => name));

    for (const donator of donatori) {
      if (raioaneNameSet.has(donator.rp_mn)) {
        const raioan = raioane.find(({ name }) => name === donator.rp_mn);
        raioan['utilizat'] = true;
      }
    }

    return raioane;
  }

  async findOne(id: string) {
    const res = await this.repo.findOne({ where: { id } });
    return res;
  }

  async update(id: string, updateRaionDto: UpdateRaionDto) {
    const res = await this.repo.update(id, updateRaionDto);
    return res;
  }

  async remove(id: string) {
    const raion = await this.repo.findOneBy({ id });
    const donator = await this.donatorRepo.findOneBy({ rp_mn: raion.name })

    if (donator) {
      throw new HttpException('Nu poate fi sters!', HttpStatus.BAD_REQUEST);
    }

    return await this.repo.delete(id);
  }
}