import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Role } from 'src/user/enums/roles.enum';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CreateSectiaDto } from './dto/create-sectia.dto';
import { UpdateSectiaDto } from './dto/update-sectia.dto';
import { Sectia } from './entities/sectia.entity';

@Injectable()
export class SectiaService {
  constructor(
    @InjectRepository(Sectia)
    readonly repo: Repository<Sectia>,
  ) {}

  async findAll(user: User): Promise<Sectia[]> {
    try {
      let qb = this.repo.createQueryBuilder('sectia');

      const res = await qb.getMany();

      return res;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string): Promise<Sectia> {
    const res = await this.repo.findOne({
      where: { id },
    });
    return res;
  }

  async create(createSectiaDto: CreateSectiaDto): Promise<Sectia> {
    const res = await this.repo.save(createSectiaDto);
    return res;
  }

  async update(
    id: string,
    updateSectiaDto: UpdateSectiaDto,
  ): Promise<UpdateResult> {
    return await this.repo.update(id, updateSectiaDto);
  }

  async remove(id: string): Promise<DeleteResult> {
    const res = await this.repo.delete(id);
    return res;
  }
}
