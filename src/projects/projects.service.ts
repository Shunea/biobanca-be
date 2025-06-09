import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonCrudService } from 'src/common/service/commonService.service';
import { IsNull, Not, Repository } from 'typeorm';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { Project } from './entities/project.entity';
import { filterProiect } from './project.utils';
import { User } from 'src/user/entities/user.entity';
import { Role } from 'src/user/enums/roles.enum';

type PaginatedProiectResponse = {
  project: Project[];
  pageCount: number;
  total: number;
};
@Injectable()
export class ProjectsService extends CommonCrudService<
  Project,
  CreateProjectDto,
  UpdateProjectDto
> {
  constructor(
    @InjectRepository(Project)
    protected projectRepo: Repository<Project>,
  ) {
    super(projectRepo);
  }

  async getPaginated(
    limit: number,
    page: number,
    filter: {
      [key: string]: any;
    },
    user: User,
  ) {
    try {
      let orderBy = [];
      let qb = this.projectRepo.createQueryBuilder('project');

      if ([Role.OPERATOR, Role.CERCETATOR_INDEPENDENT].includes(user.rol)) {
        qb.leftJoinAndSelect('project.probe', 'probe', 'probe.project_id = project.id')
          .andWhere("probe.user_id = :userId", { userId: user.id })
      }

      if (filter) {
        if (filter.orderBy && filter.orderBy.trim().length > 0) {
          orderBy = filter['orderBy'].split(',');
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
          filterProiect(filter, key, value, qb);
        }
      }

      if (orderBy && orderBy.length > 0) {
        qb.orderBy(`project.${orderBy[0]}`, orderBy[1]);
      } else {
        qb.orderBy('project.createdAt', 'DESC');
      }

      qb.take(+limit);

      if (page) {
        qb.skip(+page * +limit);
      }

      const project = await qb.getMany();
      const total = await qb.getCount();
      const pageCount = Math.ceil(total / +limit);

      return {
        project: project.slice(0, limit),
        pageCount,
        total,
      };
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async create(createProjectDto: CreateProjectDto) {
    const res = this.projectRepo.create(createProjectDto);
    return this.projectRepo.save(res);
  }

  async findAll() {
    const res = await this.projectRepo.find();
    return res;
  }


  async findOne(id: string) {
    const res = await this.projectRepo.findOne({ where: { id } });
    return res;
  }

  async findByName(denumire: string) {
    const res = await this.projectRepo.find({ where: { denumire } });
    return res;
  }

  async update(id: string, updateProjectDto: UpdateProjectDto) {
    const res = await this.projectRepo.update(id, updateProjectDto);
    return res;
  }

  async remove(id: string) {
    const res = await this.projectRepo.softDelete(id);
    return res;
  }
}
