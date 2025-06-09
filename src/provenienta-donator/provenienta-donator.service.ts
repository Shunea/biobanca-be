import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { CreateProvenientaDonatorDto } from './dto/create-provenienta-donator.dto';
import { UpdateProvenientaDonatorDto } from './dto/update-provenienta-donator.dto';
import { ProvenientaDonator } from './entities/provenienta-donator.entity';
import { Donator } from 'src/donator/entities/donator.entity';

@Injectable()
export class ProvenientaDonatorService {
  constructor(
    @InjectRepository(ProvenientaDonator)
    readonly repo: Repository<ProvenientaDonator>,
    @InjectRepository(Donator)
    readonly donatorRepo: Repository<Donator>
  ) {}

  async findAll() {
    const surse = await this.repo.find();
    const donatori = await this.donatorRepo.find({ where: { sursa_provenienta_donator: In(surse.map(({ name }) => name)) } });
    const surseNameSet = new Set(surse.map(({ name }) => name));

    for (const donator of donatori) {
      if (surseNameSet.has(donator.sursa_provenienta_donator)) {
        const sursa = surse.find(({ name }) => name === donator.sursa_provenienta_donator);
        sursa['utilizat'] = true;
      }
    }

    return surse;
  }

  async findOne(id: string) {
    return await this.repo.findOne({
      where: { id },
    });
  }

  async create(createProvenientaDonatorDto: CreateProvenientaDonatorDto) {
    return await this.repo.save(createProvenientaDonatorDto);
  }

  async update(id: string, updateProvenientaDonatorDto: UpdateProvenientaDonatorDto) {
    return await this.repo.update(id, updateProvenientaDonatorDto);
  }

  async remove(id: string) {
    const sursa = await this.repo.findOneBy({ id });
    const donator = await this.donatorRepo.findOneBy({ sursa_provenienta_donator: sursa.name })

    if (donator) {
      throw new HttpException('Nu poate fi sters!', HttpStatus.BAD_REQUEST);
    }

    return await this.repo.delete(id);
  }
}
