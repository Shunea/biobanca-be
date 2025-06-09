import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTipVaccinDto } from './dto/create-tip-vaccin.dto';
import { UpdateTipVaccinDto } from './dto/update-tip-vaccin.dto';
import { TipVaccin } from './entities/tip-vaccin.entity';

@Injectable()
export class TipVaccinService {
  constructor(
    @InjectRepository(TipVaccin)
    readonly repo: Repository<TipVaccin>,
  ) {}
  
  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: string) {
    return await this.repo.findOne({
      where: { id },
    });
  }

  async create(createTipVaccinDto: CreateTipVaccinDto) {
    return await this.repo.save(createTipVaccinDto);
  }

  async update(id: string, updateTipVaccinDto: UpdateTipVaccinDto) {
    return await this.repo.update(id, updateTipVaccinDto);
  }

  async remove(id: string) {
    return await this.repo.delete(id);
  }
}
