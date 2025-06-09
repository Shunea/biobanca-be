import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonCrudService } from 'src/common/service/commonService.service';
import { filterDonator } from 'src/donator/donator.utils';
import { User } from 'src/user/entities/user.entity';
import { Brackets, Like, Repository } from 'typeorm';
import { CreateDonatorDto } from './dto/create-donator.dto';
import { UpdateDonatorDto } from './dto/update-donator.dto';
import { Donator } from './entities/donator.entity';
import { Role } from 'src/user/enums/roles.enum';

type PaginatedDonatorResponse = {
  donator: Donator[];
  pageCount: number;
  total: number;
};
@Injectable()
export class DonatorService extends CommonCrudService<
Donator, CreateDonatorDto, UpdateDonatorDto> {
  constructor(
    @InjectRepository(Donator)
    protected donatorRepo: Repository<Donator>,
  ) {
    super(donatorRepo);
  }

 
  async getPaginated(
    limit: number,
    page: number,
    filter: {
      [key: string]: any;
    },
    user: User,
  ): Promise<PaginatedDonatorResponse> {
    try {
      let orderBy = [];
      let qb = this.donatorRepo.createQueryBuilder('donator');

      if ([Role.OPERATOR, Role.CERCETATOR_INDEPENDENT].includes(user.rol)) {
        qb.where("donator.imsp_id = :imsp_id", { imsp_id: user.imsp.id })
      }

      if (filter) {
        if (filter.orderBy && filter.orderBy.trim().length > 0) {
          orderBy = filter["orderBy"].split(',');
          delete filter.orderBy;
        }

        for (const [key, value] of Object.entries(filter)) {
          if (
            !value ||
            (Array.isArray(value) &&
              (value.includes('') ||
                value.length === 0 ||
                value.includes('NaN')))
          ) {
            delete filter[key];
          }
        }

        for (const [key, value] of Object.entries(filter)) {
          filterDonator(filter, key, value, qb);
        }
      }

      if (orderBy && orderBy.length > 0) {
        qb.orderBy(`donator.${orderBy[0]}`, orderBy[1])
      } else {
        qb.orderBy('donator.createdAt', 'DESC')
      }

      qb.take(+limit);

      if (page) {
        qb.skip(+page * +limit);
      }

      let donator = await qb.getMany();

      if ([Role.OPERATOR_BIOBANCA, Role.OPERATOR].includes(user.rol)) {
        donator = donator.map(donor => ({
          ...donor,
          IDNP: donor.id,
          nume: donor.nume && donor.nume.substring(0, 2) + '*'.repeat(donor.nume.length - 1),
          prenume: donor.prenume && donor.prenume.substring(0, 2) + '*'.repeat(donor.prenume.length - 1),
          patronimicul: donor.patronimicul && donor.patronimicul.substring(0, 2) + '*'.repeat(donor.patronimicul.length - 1)
        }));
      }

      const total = await qb.getCount();

      const pageCount = Math.ceil(total / +limit);

      return {
        donator: donator.slice(0, limit),
        pageCount,
        total,
      };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async getAllByField(field: string, user: User): Promise<Donator[]> {
    try {
      let qb = this.donatorRepo.createQueryBuilder('donator');

      qb.select(`donator.id, donator.${field}`);

      const res = qb.getRawMany();

      return res;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
  
  async getDonatorByIDNP(idnp: string): Promise<Donator> {
    try {
      return await this.donatorRepo.findOne({ where: { IDNP: Like(`${idnp}%`) }});
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async create(createDonatorDto: CreateDonatorDto) {
    const donator = await this.donatorRepo.findOne({
      where: { IDNP: createDonatorDto.IDNP },
    });
    if (donator) {
      return donator;
    }
    const res = this.donatorRepo.create(createDonatorDto);
    return this.donatorRepo.save(res);
  }

  async findAll() {
    const res = await this.donatorRepo.find();
    return res;
  }

  async findOneById(id: string, user: User) {
    let donator = await this.donatorRepo.findOne({
      where: { id },
      relations: ['probe']
    });

    if ([Role.OPERATOR_BIOBANCA, Role.OPERATOR].includes(user.rol)) {
      donator.IDNP = donator.id,
      donator.nume = donator.nume && donator.nume.substring(0, 2) + '*'.repeat(donator.nume.length - 1),
      donator.prenume = donator.prenume && donator.prenume.substring(0, 2) + '*'.repeat(donator.prenume.length - 1),
      donator.patronimicul = donator.patronimicul && donator.patronimicul.substring(0, 2) + '*'.repeat(donator.patronimicul.length - 1)
    }

    return donator;
  }

  async findByField(field: string, val: string) {
    const res = await this.donatorRepo
      .createQueryBuilder('users')
      .where(`users.${field} = :name`, { name: val })
      .getMany();
    return res;
  }

  async update(id: string, updateDonatorDto: UpdateDonatorDto) {
    const res = await this.donatorRepo.update(id, updateDonatorDto);
    return res;
  }

  async remove(id: string) {
    const res = await this.donatorRepo.delete(id);
    return res;
  }

  async dynamicStatistic(filter: { [key: string]: any }, user: User) {
    try {
      const qb = this.donatorRepo.createQueryBuilder('donator');

      if ([Role.OPERATOR, Role.CERCETATOR_INDEPENDENT].includes(user.rol)) {
        qb.where("donator.imsp_id = :imsp_id", { imsp_id: user.imsp.id })
      }

      const fQb = qb.clone();
      const cQb = qb.clone();

      if (!filter) {
        return {};
      }

      for (const [key, value] of Object.entries(filter)) {
        if (
          !value ||
          (Array.isArray(value) &&
            (value.includes('') || value.length === 0 || value.includes('NaN')))
        ) {
          delete filter[key];
        } else if (key === 'varsta_range' && value[0] === '0' && !value[1]) {
          delete filter[key];
        }
      }

      const keys = Object.keys(filter);
      const selectedKeys = keys.map((key) => {
        if (key === 'comorbiditati_range') {
          return 'comorbiditati';
        } else if (key === 'varsta_range') {
          return 'varsta';
        }
        return key;
      });

      cQb.select(selectedKeys).addSelect('COUNT(*) as total');
      const values = Object.values(filter);

      for (let i = 0; i < values.length; i++) {
        if (typeof values[i] === 'string' || typeof values[i] === 'number') {
          cQb.andWhere(`donator.${keys[i]} = :${keys[i]}`, {
            [keys[i]]: values[i],
          });
        } else if (Array.isArray(values[i])) {
          if (keys[i] === 'varsta_range') {
            const from = parseInt(values[i][0]);
            const to = parseInt(values[i][1]);

            cQb.andWhere(`donator.varsta BETWEEN :from AND :to`, {
              from,
              to,
            });
          } else if (keys[i] === 'varsta') {
            const splitVarstaGroups = values[i].map((range: string) =>
              range.split('-'),
            );
            const varstaRanges = splitVarstaGroups.map((range: string[]) => {
              const from = parseInt(range[0]);
              const to = parseInt(range[1]);
              return { from, to };
            });
            cQb.andWhere(
              new Brackets((qb) => {
                varstaRanges.forEach((range) => {
                  qb.orWhere(`donator.varsta BETWEEN :from AND :to`, {
                    from: range.from,
                    to: range.to,
                  });
                });
              }),
            );
          }
          else if (keys[i] === 'comorbiditati_range') {
            const dbKey = 'comorbiditati';
            const [from, to] = values[i];
            const comorbiditati = filter[dbKey];

            if (comorbiditati) {
              cQb.andWhere(
                `donator.${dbKey} (BETWEEN :from AND :to) OR donator.${dbKey} IN (:...${keys[i]})`,
                {
                  from,
                  to,
                  [keys[i]]: comorbiditati,
                },
              );
            } else {
              cQb.andWhere(`donator.${dbKey} BETWEEN :from AND :to`, {
                from,
                to,
              });
            }
          }
        }
      }

      for (const [key, value] of Object.entries(filter)) {
        filterDonator(filter, key, value, fQb);
      }

      const nrDonator = await fQb.getCount();
      const total = await cQb.groupBy(selectedKeys.join(', ')).getRawMany();

      filter['nrDonator'] = nrDonator;
      filter['total'] = total;

      return filter;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
