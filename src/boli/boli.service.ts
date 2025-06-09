import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoliDto } from './dto/create-boli.dto';
import { UpdateBoliDto } from './dto/update-boli.dto';
import { Boli } from './entities/boli.entity';

@Injectable()
export class BoliService {
  constructor(
    @InjectRepository(Boli)
    readonly repo: Repository<Boli>,
  ) {}

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: string) {
    return await this.repo.findOne({
      where: { id },
    });
  }

  async create(createBoliDto: CreateBoliDto) {
    return await this.repo.save(createBoliDto);
  }

  async update(id: string, updateBoliDto: UpdateBoliDto) {
    return await this.repo.update(id, updateBoliDto);
  }

  async remove(id: string) {
    return await this.repo.delete(id);
  }
}
