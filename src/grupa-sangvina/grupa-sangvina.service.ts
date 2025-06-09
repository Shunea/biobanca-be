import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateGrupaSangvinaDto } from './dto/create-grupa-sangvina.dto';
import { UpdateGrupaSangvinaDto } from './dto/update-grupa-sangvina.dto';
import { GrupaSangvina } from './entities/grupa-sangvina.entity';

@Injectable()
export class GrupaSangvinaService {
  constructor(
    @InjectRepository(GrupaSangvina)
    readonly repo: Repository<GrupaSangvina>,
  ) {}

  async findAll(): Promise<GrupaSangvina[]> {
    return await this.repo.find();
  }

  async findOne(id: string): Promise<GrupaSangvina> {
    return await this.repo.findOne({
      where: { id },
    });
  }

  async create(
    createGrupaSangvinaDto: CreateGrupaSangvinaDto,
  ): Promise<GrupaSangvina> {
    const res = await this.repo.save(createGrupaSangvinaDto);
    return res;
  }

  async update(
    id: string,
    updateGrupaSangvinaDto: UpdateGrupaSangvinaDto,
  ): Promise<UpdateResult> {
    const res = await this.repo.update(id, updateGrupaSangvinaDto);
    return res;
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.repo.delete(id);
  }
}
