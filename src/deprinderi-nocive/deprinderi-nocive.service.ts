import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDeprinderiNociveDto } from './dto/create-deprinderi-nocive.dto';
import { UpdateDeprinderiNociveDto } from './dto/update-deprinderi-nocive.dto';
import { DeprinderiNocive } from './entities/deprinderi-nocive.entity';

@Injectable()
export class DeprinderiNociveService {
  constructor(
    @InjectRepository(DeprinderiNocive)
    readonly repo: Repository<DeprinderiNocive>,
  ) {}

  async create(createDeprinderiNociveDto: CreateDeprinderiNociveDto) {
    const res = this.repo.create(createDeprinderiNociveDto);
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

  async update(id: string, updateDeprinderiNociveDto: UpdateDeprinderiNociveDto) {
    const res = await this.repo.update(id, updateDeprinderiNociveDto);
    return res;
  }

  async remove(id: string) {
    const res = await this.repo.delete(id);
    return res;
  }
}