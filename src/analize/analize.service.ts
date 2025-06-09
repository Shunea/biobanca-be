import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAnalizeDto } from './dto/create-analize.dto';
import { UpdateAnalizeDto } from './dto/update-analize.dto';
import { Analize } from './entities/analize.entity';

@Injectable()
export class AnalizeService {
  constructor(
    @InjectRepository(Analize)
    readonly repo: Repository<Analize>,
  ) {}

  async create(createAnalizeDto: CreateAnalizeDto) {
    const res = this.repo.create(createAnalizeDto);
    return this.repo.save(res);
  }

  async findAll() {
    const res = await this.repo.find();
    return res;
  }

  async findOne(id: string) {
    const res = await this.repo.findOne({ where: { id } });
    return res;
  }

  async update(id: string, updateAnalizeDto: UpdateAnalizeDto) {
    const res = await this.repo.update(id, updateAnalizeDto);
    return res;
  }

  async remove(id: string) {
    const res = await this.repo.delete(id);
    return res;
  }
}