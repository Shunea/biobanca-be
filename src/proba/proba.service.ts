import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CelulaCutie } from 'src/celula-cutie/entities/celula-cutie.entity';
import { Brackets, In, IsNull, Not, Repository } from 'typeorm';
import { CreateProbaDto } from './dto/create-proba.dto';
import { UpdateProbaDto } from './dto/update-proba.dto';
import { CommonCrudService } from 'src/common/service/commonService.service';
import { Proba } from './entities/proba.entity';
import { Parinte } from 'src/parinte/entities/parinte.entity';
import { Copii } from 'src/copii/entities/copii.entity';
import { Rude } from 'src/rude/entity/rude.entity';
import { ProbaAlicotata } from 'src/proba-alicotata/entities/proba-alicotata.entity';
import { Cutie } from 'src/cutie/entities/cutie.entity';
import { User } from 'src/user/entities/user.entity';
import { Role } from 'src/user/enums/roles.enum';
import { filterProba } from './proba.utils';
import { BarcodeService } from 'src/barcode/barcode.service';
import { StatutProba } from 'src/common/commonEnums';
import { ProbaAlicotataService } from 'src/proba-alicotata/proba-alicotata.service';

type PaginatedProbaResponse = {
  proba: Proba[];
  pageCount: number;
  total: number;
};

@Injectable()
export class ProbaService extends CommonCrudService<
  Proba,
  CreateProbaDto,
  UpdateProbaDto
> {
  constructor(
    @InjectRepository(Proba)
    private readonly probaRepo: Repository<Proba>,
    @Inject(forwardRef(() => BarcodeService))
    private readonly barcodeService: BarcodeService,
    @Inject(forwardRef(() => ProbaAlicotataService))
    private readonly probaAlicotataService: ProbaAlicotataService
  ) {
    super(probaRepo);
  }

  async getPaginated(
    limit: number,
    page: number,
    filter: {
      [key: string]: any;
    },
    user: User,

  ): Promise<PaginatedProbaResponse> {
    try {
      let deleted = false;
      const realLimit = Math.min(100, limit);
      const realLimitPlusOne = realLimit + 1;

      let orderBy = [];
      let qb = this.probaRepo.createQueryBuilder('proba');

      if ([Role.OPERATOR, Role.CERCETATOR_INDEPENDENT].includes(user.rol)) {
        qb.where("proba.imsp_id = :imsp_id", { imsp_id: user.imsp.id })
      }

      if (filter) {
        if (filter.deleted) {
          deleted = filter.deleted === "true";
          delete filter.deleted;
        }
        
        if (deleted) {
          const probeAlicotateArhivate = await this.probaAlicotataService.getAllDeleted();
          const probeMamaIds = [...new Set(probeAlicotateArhivate.map(({ proba_id }) => proba_id))];

          if (probeMamaIds.length > 0) {
            qb.where((qb) => {
              qb.where("proba.deleted_at IS NOT NULL").orWhere("proba.id IN (:...ids)", { ids: [null, ...probeMamaIds]});
            }).withDeleted();
          } else {
            qb.where("proba.deleted_at IS NOT NULL").withDeleted();
          }
        }

        if (filter.orderBy && filter.orderBy.trim().length > 0) {
          orderBy = filter["orderBy"].split(',');
          delete filter.orderBy;
        }
  
        if (user.rol != Role.SUPER_ADMIN) {
          qb = qb.andWhere('proba.imsp_id = :imsp', { imsp: user.imsp.id });
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
          } else if (key === 'varsta_range' && value[0] === '0' && !value[1]) {
            delete filter[key];
          }
        }

        for (const [key, value] of Object.entries(filter)) {
          filterProba(filter, key, value, qb);
        }
      } 

      qb.leftJoinAndSelect('proba.cutie', 'cutie')
        .leftJoinAndSelect('proba.copii', 'copii')
        .leftJoinAndSelect('proba.donator', 'donator')
        .leftJoinAndSelect('proba.frigider', 'frigider')
        .leftJoinAndSelect('proba.imsp', 'imsp')
        .leftJoinAndSelect('proba.parinti', 'parinti')
        .leftJoinAndSelect('proba.probe_alicotate', 'probe_alicotate')
        .leftJoinAndSelect('proba.project', 'project')
        .leftJoinAndSelect('proba.rude', 'rude')
        .leftJoinAndSelect('proba.anamneza_vietii', 'anamneza_vietii')
        .leftJoinAndSelect('proba.vaccin', 'vaccin')
        .leftJoinAndSelect('proba.barcodes', 'barcodes')

      if (orderBy && orderBy.length > 0) {
        qb.orderBy(`proba.${orderBy[0]}`, orderBy[1])
      } else {
        qb.orderBy('proba.createdAt', 'DESC')
          .addOrderBy('proba.nr_proba', 'DESC') 
      }
      
      qb.take(realLimitPlusOne);

      if (page) {
        qb.skip(page * realLimit);
      }

      const probe = await qb.getMany();

      if (deleted) {
        for (const proba of probe) {
          proba.probe_alicotate = proba.probe_alicotate.filter(({ statutul_probei }) => statutul_probei === StatutProba.Distrusa || statutul_probei === StatutProba.Refuzata);
        }
      }
      
      const result = await this.changeProbaResponse(probe);
      const total = await qb.getCount();
      const pageCount = Math.ceil(total / realLimit);

      return {
        proba: result.slice(0, limit),
        pageCount,
        total,
      };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
  async getAllByField(field: string, user: User): Promise<Proba[]> {
    try {
      let qb = this.probaRepo.createQueryBuilder('proba');

      qb.select(`proba.id, proba.${field}`);

      const res = qb.getRawMany();

      return res;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
  async getAllByFilter(filter: {
    [key: string]: any;
  }): Promise<[Proba[], number]> {
    try {
      const qb = this.probaRepo.createQueryBuilder('proba');

      if (filter) {
        for (const [key, value] of Object.entries(filter)) {
          if (
            !value ||
            (Array.isArray(value) && (value.includes('') || value.length === 0))
          ) {
            delete filter[key];
          }
        }

        for (const [key, value] of Object.entries(filter)) {
          filterProba(filter, key, value, qb);
        }
      }

      const keys = Object.keys(filter);
      const selectedKeys = keys.map((key) => {
        if (key === 'comorbiditati_range') {
          return 'proba.comorbiditati';
        } else if (key === 'varsta_range') {
          return 'proba.varsta';
        }
        return `proba.${key}`;
      });

      const proba = await qb.select(selectedKeys).getMany();

      return [proba, proba.length];
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async create(createProbaDto: CreateProbaDto): Promise<Proba> {
    const barcodeIds = [];
    const { rand, coloana, cutie_id } = createProbaDto;

    const queryRunner = this.probaRepo.manager.connection.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      const parinti = createProbaDto.parinti.map((parinte) => {
        const newParinte = new Parinte();
        Object.assign(newParinte, parinte);
        return newParinte;
      });

      const copii = createProbaDto.copii.map((copil) => {
        const newCopil = new Copii();
        Object.assign(newCopil, copil);
        return newCopil;
      });

      const rude = createProbaDto.rude.map((ruda) => {
        const newRuda = new Rude();
        Object.assign(newRuda, ruda);
        return newRuda;
      });

      const probeAlicotate = createProbaDto.probe_alicotate.map((proba) => {
        const newProbaAlicotata = new ProbaAlicotata();
        Object.assign(newProbaAlicotata, proba);
        return newProbaAlicotata;
      });

      const newProba = new Proba();
      Object.assign(newProba, createProbaDto);
      newProba.parinti = parinti;
      newProba.copii = copii;
      newProba.rude = rude;
      newProba.probe_alicotate = probeAlicotate;

      if (newProba.probe_alicotate.length > 0) {
        newProba.statutul_probei = StatutProba.Alicotata;
      }

      const res = await queryRunner.manager.save(newProba);

      if (res.alicotata && res.alicotata === "Nu") {
        await queryRunner.manager.update(
          Cutie,
          { id: cutie_id },
          { free_space: () => 'free_space - 1' },
        );
        await queryRunner.manager.update(
          CelulaCutie,
          {
            column_number: coloana,
            row_number: rand,
          },
          {
            column_number: coloana,
            row_number: rand,
            is_free: false,
          },
        );
      } else {
        probeAlicotate.forEach(async (proba) => {
          await queryRunner.manager.update(
            Cutie,
            { id: proba.cutie_id },
            { free_space: () => 'free_space - 1' },
          );
          await queryRunner.manager.update(
            CelulaCutie,
            {
              column_number: proba.coloana,
              row_number: proba.rand,
            },
            {
              column_number: proba.coloana,
              row_number: proba.rand,
              is_free: false,
            },
          );
        });
      }

      await queryRunner.commitTransaction();

      if (res) {
        const barcodes = await this.barcodeService.create({ probaId: res.id });
        barcodeIds.push(barcodes.map(({ id }) => id));
      }

      return res;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      await this.barcodeService.deleteByIds(barcodeIds);
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    } finally {
      await queryRunner.release();
    }
  }

  async findAll() {
    const probe = await this.probaRepo.find({
      relations: [
        'cutie',
        'copii',
        'donator',
        'frigider',
        'imsp',
        'parinti',
        'probe_alicotate',
        'project',
        'rude',
        'anamneza_vietii',
        'vaccin',
        'barcodes'
      ]
    });

    const result = await this.changeProbaResponse(probe);

    return result;
  }

  async findOne(id: string) {
    const res = await this.probaRepo.findOne({
      where: { id },
      relations: [
        'cutie',
        'copii',
        'donator',
        'frigider',
        'imsp',
        'parinti',
        'probe_alicotate',
        'project',
        'rude',
        'anamneza_vietii',
        'vaccin',
        'barcodes'
      ]
    });

    return res;
  }

  async getLastProba() {
    const res = await this.probaRepo.find({
      order: { createdAt: 'DESC' },
      take: 1,
    });

    return res;
  }
  
  async getArhivaProbe(
    limit: number,
    page: number,
    filter: {
      [key: string]: any;
    },
    user: User,
   ) {
    try {
      const probeAlicotateArhivate = await this.probaAlicotataService.getAllDeleted();
      const probeMamaIds = probeAlicotateArhivate.map(({ proba_id }) => proba_id);

      let orderBy = [];
      let qb = this.probaRepo.createQueryBuilder('proba');

      if (filter) {
        if (filter.orderBy && filter.orderBy.trim().length > 0) {
          orderBy = filter["orderBy"].split(',');
          delete filter.orderBy;
        }

        if ([Role.OPERATOR, Role.OPERATOR_BIOBANCA].includes(user.rol)) {
          qb = qb.where('proba.imsp_id = :imsp', { imsp: user.imsp.id })
            .andWhere("proba.user_id = :userId", { userId: user.id })
        }
        
        if ([Role.OPERATOR_BIOBANCA, Role.CERCETATOR_INDEPENDENT].includes(user.rol)) {
          qb = qb.where('proba.imsp_id = :imsp', { imsp: user.imsp.id })
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
          filterProba(filter, key, value, qb);
        }
      }

      qb.where({ deletedAt: Not(IsNull()) })
        .orWhere({ id: In(probeMamaIds) })
        .withDeleted()
        .leftJoinAndSelect('proba.cutie', 'cutie')
        .leftJoinAndSelect('proba.copii', 'copii')
        .leftJoinAndSelect('proba.donator', 'donator')
        .leftJoinAndSelect('proba.frigider', 'frigider')
        .leftJoinAndSelect('proba.imsp', 'imsp')
        .leftJoinAndSelect('proba.parinti', 'parinti')
        .leftJoinAndSelect('proba.probe_alicotate', 'probe_alicotate')
        .leftJoinAndSelect('proba.project', 'project')
        .leftJoinAndSelect('proba.rude', 'rude')
        .leftJoinAndSelect('proba.anamneza_vietii', 'anamneza_vietii')
        .leftJoinAndSelect('proba.vaccin', 'vaccin')
        .leftJoinAndSelect('proba.barcodes', 'barcodes')
      
      if (orderBy && orderBy.length > 0) {
        qb.orderBy(`proba.${orderBy[0]}`, orderBy[1])
      } else {
        qb.orderBy('proba.createdAt', 'DESC')
          .addOrderBy('proba.nr_proba', 'DESC') 
      }

      qb.take(+limit);

      if (page) {
        qb.skip(+page * +limit);
      }

      const probe = await qb.getMany();

      for (const proba of probe) {
        proba.probe_alicotate = proba.probe_alicotate.filter(({ statutul_probei }) => statutul_probei === StatutProba.Distrusa || statutul_probei === StatutProba.Refuzata);
      }

      const result = await this.changeProbaResponse(probe);
      const total = await qb.getCount();
      const pageCount = Math.ceil(total / +limit);

      return {
        data: result.slice(0, limit),
        pageCount,
        total,
      };
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  async updateProba(id: string, updateProbaDto: UpdateProbaDto, user: User) {
    if (updateProbaDto.statutul_probei) {
      updateProbaDto.modificare_statut = `${user.name} ${user.lastname}`;
      updateProbaDto.modificare_statut_date = new Date();
    }

    await this.probaRepo.createQueryBuilder()
      .update(Proba)
      .set(updateProbaDto)
      .where("id = :id", { id })
      .execute();

    return await this.probaRepo.createQueryBuilder('proba')
      .where({ id })
      .getOne();
  }

  async remove(id: string, body: any) {
    if (!!body.archived) {
      return await this.probaRepo.delete(id);
    }

    return await this.probaRepo.softDelete(id);
  }
  
  async dynamicStatistic(filter: { [key: string]: any }, user: User) {
    try {
      if (!filter) {
        return {};
      }

      let donatorJoin = false;
      let proiectJoin = false;
      let cutieJoin = false;
      let frigiderJoin = false;
      let parintiJoin = false;
      let copiiJoin = false;
      let rudeJoin = false;
      let alicotataJoin = false;

      const qb = this.probaRepo.createQueryBuilder('proba')
        .leftJoinAndSelect('proba.imsp', 'imsp');

      if ([Role.OPERATOR, Role.CERCETATOR_INDEPENDENT].includes(user.rol)) {
        qb.where("proba.imsp_id = :imsp_id", { imsp_id: user.imsp.id })
      }

      for (const key of Object.keys(filter)) {
        if (key.includes("donator_") && !donatorJoin) {
          qb.leftJoinAndSelect('proba.donator', 'donator');
          donatorJoin = true;
        } else if (key.includes("proiect_") && !proiectJoin) {
          qb.leftJoinAndSelect('proba.project', 'project');
          proiectJoin = true;
        } else if (key.includes("cutie_") && !cutieJoin) {
          qb.leftJoinAndSelect('proba.cutie', 'cutie');
          cutieJoin = true;
        } else if (key.includes("frigider_") && !frigiderJoin) {
          qb.leftJoinAndSelect('proba.frigider', 'frigider');
          frigiderJoin = true;
        } else if (key.includes("alicotate_name") && !alicotataJoin) {
          qb.leftJoinAndSelect('proba.probe_alicotate', 'probe_alicotate')
          alicotataJoin = true;
        }
        // else if (key.includes("_parinti") && !parintiJoin) {
        //   qb.leftJoinAndSelect('proba.parinti', 'parinti');
        //   if (filter[key].length === 1 && filter[key] === "Da") {
        //     qb.andWhere("parinti.probaId IS NOT NULL");
        //   } else if (filter[key].length === 1 && filter[key] === "Nu") {
        //     qb.andWhere("parinti.probaId IS NULL");
        //   }
        //   parintiJoin = true;
        // } else if (key.includes("_copii") && !copiiJoin) {
        //   qb.leftJoinAndSelect('proba.copii', 'copii');
        //   copiiJoin = true;
        // } else if (key.includes("_rude") && !rudeJoin) {
        //   qb.leftJoinAndSelect('proba.rude', 'rude');
        //   rudeJoin = true;
        // } 
      }
      
      const filterQb = qb.clone();
      const keys = Object.keys(filter).map((key) => {
        if (key.includes("donator_")) {
          return key.replace("donator_", "donator.");
        } else if (key.includes("proiect_")) {
          return key.replace("proiect_", "project.");
        } else if (key.includes("cutie_")) {
          return key.replace("cutie_", "cutie.");
        } else if (key.includes("frigider_")) {
          return key.replace("frigider_", "frigider.");
        } else if (key.includes("proba_")) {
          return key.replace("proba_", "proba.");
        }
      });

      for (const [key, value] of Object.entries(filter)) {
        if (
          !value ||
          (Array.isArray(value) &&
            (value.includes('') || value.length === 0 || value.includes('NaN')))
        ) {
          delete filter[key];
        } else if (key.includes('varsta_range') && value[0] === '0' && !value[1]) {
          delete filter[key];
        }
      }

      const selectedKeys = keys.map((key) => {
        if (key.includes('comorbiditati_range')) {
          return 'comorbiditati';
        } else if (key.includes('varsta_range')) {
          return 'varsta';
        }
        return key;
      });

      filterQb.select(selectedKeys).addSelect('COUNT(*) as total');

      for (const [key, value] of Object.entries(filter)) {
        filterProba(filter, key, value, filterQb);
      }

      const totalProbe = await qb.getCount();
      const total = await filterQb.groupBy(selectedKeys.join(', ')).getRawMany();

      const renamedTotal = total.map(obj => {
        const renamedObj = {};
        for (let key in obj) {
          if (obj.hasOwnProperty(key)) {
            if (key.includes("donator_")) {
              const newKey = key.replace("donator_", "");
              renamedObj[newKey] = obj[key];
            } else if (key.includes("proiect_")) {
              const newKey = key.replace("proiect_", "");
              renamedObj[newKey] = obj[key];
            } else if (key.includes("cutie_")) {
              const newKey = key.replace("cutie_", "");
              renamedObj[newKey] = obj[key];
            } else if (key.includes("frigider_")) {
              const newKey = key.replace("frigider_", "");
              renamedObj[newKey] = obj[key];
            } else if (key.includes("proba_")) {
              const newKey = key.replace("proba_", "");
              renamedObj[newKey] = obj[key];
            } else {
              renamedObj[key] = obj[key];
            }
          }
        }
        return renamedObj;
      });

      return { totalProbe, total: renamedTotal };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  private async changeProbaResponse(probe: Proba[]) {
    for (const proba of probe) {
      const subRows = [];
      
      for (const probaAlicotata of proba.probe_alicotate) {
        probaAlicotata["barcode"] = proba.barcodes.find(({ probaId, probaAlicotataId }) => proba.id === probaId && probaAlicotata.id === probaAlicotataId) ?? null;
        
        if (probaAlicotata.modificare_statut_date) {
          const modificare_statut_date = new Date(probaAlicotata.modificare_statut_date);
          probaAlicotata.modificare_statut_date = new Date(modificare_statut_date.setHours(modificare_statut_date.getHours() + 3));
        }

        if (probaAlicotata.proba_id === proba.id) {
          proba["proba_alicotata_id"] = probaAlicotata.id;
          
          const subRow = {...proba, ...probaAlicotata, ...{
            nr_proba: `${proba.nr_proba} / ${probaAlicotata.name.match(/A(\d+)$/)?.[0] || ''}`,
            nume_proba: probaAlicotata.name,
            modificare_statut: probaAlicotata.modificare_statut,
            modificare_statut_date: probaAlicotata.modificare_statut_date,
            statutul_probei: probaAlicotata.statutul_probei,
            barcode: probaAlicotata["barcode"],
          }}

          subRows.push(subRow);
        }
      }
      
      proba["subRows"] = subRows;
      proba["barcode"] = proba.barcodes.find(({ probaId, probaAlicotataId }) => proba.id === probaId && !probaAlicotataId) ?? null;
      delete proba.barcodes;

      if (proba.modificare_statut_date) {
        const modificare_statut_date = new Date(proba.modificare_statut_date);
        proba.modificare_statut_date = new Date(modificare_statut_date.setHours(modificare_statut_date.getHours() + 3));
      }
    }

    return probe;
  }
}
