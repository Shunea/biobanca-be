import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import {
  DeleteResult,
  Repository,
  UpdateResult,
  DeepPartial,
  FindOptionsWhere,
} from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

@Injectable()
export abstract class CommonCrudService<T, C, U> {
  protected repo: Repository<T>;

  protected constructor(repository: Repository<T>) {
    this.repo = repository;
  }

  async create(createDto: C): Promise<T> {
    try {
      const objToSave = {
        ...createDto,
      } as unknown as DeepPartial<T>;
      const res = await this.repo.save(objToSave);
      return res;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string | string, updateDto: U, user?: User): Promise<UpdateResult> {
    try {
      const updated = await this.repo.update(id, {
        ...updateDto,
      } as unknown as QueryDeepPartialEntity<T>);
      return updated;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll(): Promise<T[]> {
    try {
      const res = await this.repo.find();
      return res;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string): Promise<T> {
    try {
      const res = await this.repo.findOneBy({
        id: id,
      } as unknown as FindOptionsWhere<T>);
      return res;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  public async remove(
    id: string | string | number[] | string[],
    hard = false,
  ): Promise<DeleteResult | T> {
    try {
      let res: T | UpdateResult | DeleteResult | PromiseLike<T | DeleteResult>;
      if (hard) {
        res = await this.repo.delete(id);
      } else {
        res = await this.repo.softDelete(id);
      }
      return res;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
