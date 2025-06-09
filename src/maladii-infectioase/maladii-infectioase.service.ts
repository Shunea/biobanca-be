import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMaladiiInfectioaseDto } from './dto/create-maladii-infectioase.dto';
import { UpdateMaladiiInfectioaseDto } from './dto/update-maladii-infectioase.dto';
import { MaladiiInfectioase } from './entities/maladii-infectioase.entity';

@Injectable()
export class MaladiiInfectioaseService {
  constructor(
    @InjectRepository(MaladiiInfectioase)
    readonly repo: Repository<MaladiiInfectioase>,
  ) {}

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: string) {
    return await this.repo.findOne({
      where: { id },
    });
  }

  async create(createMaladiiInfectioaseDto: CreateMaladiiInfectioaseDto) {
    return await this.repo.save(createMaladiiInfectioaseDto);
  }

  async update(id: string, updateMaladiiInfectioaseDto: UpdateMaladiiInfectioaseDto) {
    return await this.repo.update(id, updateMaladiiInfectioaseDto);
  }

  async remove(id: string) {
    return await this.repo.delete(id);
  }
}
