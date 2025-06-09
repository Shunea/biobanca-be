import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTipPastrareDto } from './dto/create-tip-pastrare.dto';
import { UpdateTipPastrareDto } from './dto/update-tip-pastrare.dto';
import { TipPastrare } from './entities/tip-pastrare.entity';

@Injectable()
export class TipPastrareService {
  constructor(
    @InjectRepository(TipPastrare)
    readonly repo: Repository<TipPastrare>,
  ) {}

  async findAll() {
    return await this.repo.find();
  }

  async findOne(id: string) {
    return await this.repo.findOne({
      where: { id },
    });
  }

  async create(createTipPastrareDto: CreateTipPastrareDto) {
    return await this.repo.save(createTipPastrareDto);
  }

  async update(id: string, updateTipPastrareDto: UpdateTipPastrareDto) {
    return await this.repo.update(id, updateTipPastrareDto);
  }

  async remove(id: string) {
    return await this.repo.delete(id);
  }
}
