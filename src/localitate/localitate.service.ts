import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateLocalitateDto } from './dto/create-localitate.dto';
import { UpdateLocalitateDto } from './dto/update-localitate.dto';
import { Localitate } from './entity/localitate.entity';

@Injectable()
export class LocalitateService {
  constructor(
    @InjectRepository(Localitate)
    readonly repo: Repository<Localitate>,
  ) {}

  async findAll(): Promise<Localitate[]> {
    return await this.repo.find();
  }

  async findOne(id: string): Promise<Localitate> {
    return await this.repo.findOne({
      where: { id },
    });
  }

  async create(createLocalitateDto: CreateLocalitateDto): Promise<Localitate> {
    const res = await this.repo.save(createLocalitateDto);
    return res;
  }

  async update(
    id: string,
    updateLocalitateDto: UpdateLocalitateDto,
  ): Promise<UpdateResult> {
    const res = await this.repo.update(id, updateLocalitateDto);
    return res;
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.repo.delete(id);
  }
}
