import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Role } from 'src/user/enums/roles.enum';
import { DeleteResult, In, Repository, UpdateResult } from 'typeorm';
import { CreateImspDto } from './dto/create-imsp.dto';
import { UpdateImspDto } from './dto/update-imsp.dto';
import { Imsp } from './entities/imsp.entity';
import { Proba } from 'src/proba/entities/proba.entity';

@Injectable()
export class ImspService {
  constructor(
    @InjectRepository(Imsp)
    readonly repo: Repository<Imsp>,
    @InjectRepository(Proba)
    readonly probaRepo: Repository<Proba>
  ) {}

  async findByName(name: string): Promise<Imsp> {
    const res = await this.repo.findOneBy({
      name,
    });

    return res;
  }

  async create(createImspDto: CreateImspDto): Promise<Imsp> {
    const res = await this.repo.save(createImspDto);
    return res;
  }

  async findAll(): Promise<Imsp[]> {
    try {
      const imspuri = await this.repo.find();
      const probe = await this.probaRepo.find({ where: { imsp_id: In(imspuri.map(({ id }) => id)) } });
      const imspIdSet = new Set(imspuri.map(({ id }) => id));

      for (const proba of probe) {
        if (imspIdSet.has(proba.imsp_id)) {
          const imsp = imspuri.find(({ id }) => id === proba.imsp_id);
          imsp['utilizat'] = true;
        }
      }

      return imspuri;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string): Promise<Imsp> {
    const res = await this.repo.findOne({
      where: { id },
    });
    return res;
  }

  async update(
    id: string,
    updateImspDto: UpdateImspDto,
  ): Promise<UpdateResult> {
    return await this.repo.update(id, updateImspDto);
  }

  async remove(id: string): Promise<DeleteResult> {
    const imsp = await this.repo.findOneBy({ id });
    const proba = await this.probaRepo.findOneBy({ imsp_id: imsp.id })

    if (proba) {
      throw new HttpException('Nu poate fi sters!', HttpStatus.BAD_REQUEST);
    }

    return await this.repo.delete(id);
  }
}
