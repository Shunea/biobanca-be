import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, In, Repository, UpdateResult } from 'typeorm';
import { CreateTransferatLaDto } from './dto/create-transferat-la.dto';
import { UpdateTransferatLaDto } from './dto/update-transferat-la.dto';
import { TransferatLa } from './entity/transferat-la.entity';
import { Proba } from 'src/proba/entities/proba.entity';


@Injectable()
export class TransferatLaService {
  constructor(
    @InjectRepository(TransferatLa)
    readonly repo: Repository<TransferatLa>,
    @InjectRepository(Proba)
    readonly probaRepo: Repository<Proba>
  ) {}

  async findAll(): Promise<TransferatLa[]> {
    const transfere = await this.repo.find();
    const probe = await this.probaRepo.find({ where: { sursa_provenienta_proba: In(transfere.map(({ name }) => name)) } });
    const transfereNameSet = new Set(transfere.map(({ name }) => name));

    for (const proba of probe) {
      if (transfereNameSet.has(proba.sursa_provenienta_proba)) {
        const transfer = transfere.find(({ name }) => name === proba.sursa_provenienta_proba);
        transfer['utilizat'] = true;
      }
    }

    return transfere;
  }

  async findOne(id: string): Promise<TransferatLa> {
    return await this.repo.findOne({
      where: { id },
    });
  }

  async create(createTransferatLaDto: CreateTransferatLaDto): Promise<TransferatLa> {
    const res = await this.repo.save(createTransferatLaDto);
    return res;
  }

  async update(
    id: string,
    updateTransferatLaDto: UpdateTransferatLaDto,
  ): Promise<UpdateResult> {
    const res = await this.repo.update(id, updateTransferatLaDto);
    return res;
  }

  async remove(id: string): Promise<DeleteResult> {
    const transfer = await this.repo.findOneBy({ id });
    const proba = await this.probaRepo.findOneBy({ sursa_provenienta_proba: transfer.name })

    if (proba) {
      throw new HttpException('Nu poate fi sters!', HttpStatus.BAD_REQUEST);
    }

    return await this.repo.delete(id);
  }
}
