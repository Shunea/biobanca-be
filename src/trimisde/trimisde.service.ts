import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTrimisDeDto } from './dto/create-trimisde.dto';
import { UpdateTrimisDeDto } from './dto/update-trimisde.dto';
import { TrimisDe } from './entities/trimisde.entity';

@Injectable()
export class TrimisDeService {
  constructor(
    @InjectRepository(TrimisDe)
    readonly repo: Repository<TrimisDe>,
  ) {}

  create(createTrimisDeDto: CreateTrimisDeDto) {
    const trimisDe = this.repo.create(createTrimisDeDto);
    return this.repo.save(trimisDe);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOne({ where: { id } });
  }

  update(id: string, updateTrimisDeDto: UpdateTrimisDeDto) {
    return this.repo.update(id, updateTrimisDeDto);
  }

  remove(id: string) {
    return this.repo.delete(id);
  }
}
