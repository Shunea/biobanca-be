import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CelulaCutieService } from 'src/celula-cutie/celula-cutie.service';
import { CelulaCutie } from 'src/celula-cutie/entities/celula-cutie.entity';
import { CommonCrudService } from 'src/common/service/commonService.service';
import { Repository } from 'typeorm';
import { CreateCutieDto } from './dto/create-cutie.dto';
import { UpdateCutieDto } from './dto/update-cutie.dto';
import { Cutie } from './entities/cutie.entity';

@Injectable()
export class CutieService extends CommonCrudService<
  Cutie,
  CreateCutieDto,
  UpdateCutieDto
> {
  constructor(
    @InjectRepository(Cutie)
    protected readonly repository: Repository<Cutie>,
    private readonly celulaCutieService: CelulaCutieService,
  ) {
    super(repository);
  }

  async findByNumber(nr_cutie: string): Promise<Cutie> {
    const res = await this.repository.findOne({ where: { nr_cutie } });
    return res;
  }

  async findWithCelule(id: string) {
    const qb = this.repository.createQueryBuilder('cutie');
    qb.where('cutie.id = :id', { id });
    qb.leftJoinAndSelect('cutie.celule', 'celula');

    const res = await qb.getOne();

    const freeCells = res.celule
      .filter((celula) => celula.is_free)
      .reduce(
        (accumulator, currentCell) => {
          // return in this format:
          // {
          // row: 1,
          // columns: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
          // }
          const row = currentCell.row_number;
          const column = currentCell.column_number;

          const rowExists = accumulator.cells.find((cell) => cell.row === row);

          if (rowExists) {
            rowExists.columns.push(column);
          } else {
            accumulator.cells.push({
              row,
              columns: [column],
            });
          }
          return accumulator;
        },
        { cells: [] },
      );

    const formattedRes = {
      ...res,
      freeCells: freeCells.cells,
    };

    return formattedRes;
  }

  async findFreeCutii(): Promise<Cutie[]> {
    const qb = this.repository.createQueryBuilder('cutie');
    qb.where('cutie.free_space > 0');

    const res = await qb.getMany();
    return res;
  }

  async create(createDto: CreateCutieDto): Promise<Cutie> {
    const newCutie = await this.repository.save(createDto);

    if (createDto.tip_cutie === 'Mare') {
      for (let i = 0; i < 100; i++) {
        const celulaCutie = new CelulaCutie();
        celulaCutie.cutie = newCutie;
        celulaCutie.row_number = Math.floor(i / 10) + 1;
        celulaCutie.column_number = (i % 10) + 1;
        await this.celulaCutieService.save(celulaCutie);
      }
    } else if (createDto.tip_cutie === 'Mica') {
      for (let i = 0; i < 81; i++) {
        const celulaCutie = new CelulaCutie();
        celulaCutie.cutie = newCutie;
        celulaCutie.row_number = Math.floor(i / 9) + 1;
        celulaCutie.column_number = (i % 9) + 1;
        await this.celulaCutieService.save(celulaCutie);
      }
    }

    return newCutie;
  }
}
