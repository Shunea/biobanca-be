import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateCormDto } from './dto/create-corm.dto';
import { UpdateCormDto } from './dto/update-corm.dto';
import { Corm } from './entities/corm.entity';

@Injectable()
export class CormService {
  constructor(
    @InjectRepository(Corm)
    readonly repo: Repository<Corm>,
  ) {}

  async findAll(): Promise<Corm[]> {
    return await this.repo.find();
  }

  async findOne(id: string): Promise<Corm> {
    return await this.repo.findOne({
      where: { id },
    });
  }

  async create(createCormDto: CreateCormDto): Promise<Corm> {
    const res = await this.repo.save(createCormDto);
    return res;
  }

  async update(
    id: string,
    updateCormDto: UpdateCormDto,
  ): Promise<UpdateResult> {
    const res = await this.repo.update(id, updateCormDto);
    return res;
  }

  async remove(id: string): Promise<DeleteResult> {
    return this.repo.delete(id);
  }
}
