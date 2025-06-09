import {
  Injectable,
  ValidationPipe,
  ValidationPipeOptions,
  Type,
  ArgumentMetadata,
  Body,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
} from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { ResponseFactory } from '../ResponseFactory';
import { CommonCrudService } from '../service/commonService.service';
import { REGEX_UUID_VALIDATION } from '../Regex';

type ClassType<T> = new (...args: any[]) => T;

export interface CrudController<T, C, U> {
  create(body: C): Promise<T>;
  findAll(): Promise<T[]>;
  findOne(id: string): Promise<T>;
  update(id: string, body: U): Promise<T | UpdateResult>;
  remove(id: string): Promise<T | DeleteResult>;
}

@Injectable()
export class AbstractValidationPipe extends ValidationPipe {
  constructor(
    options: ValidationPipeOptions,
    private readonly targetTypes: { body?: Type; query?: Type; param?: Type },
  ) {
    super(options);
  }

  async transform(value: any, metadata: ArgumentMetadata) {
    const targetType = this.targetTypes[metadata.type];
    if (!targetType) {
      return super.transform(value, metadata);
    }
    return super.transform(value, { ...metadata, metatype: targetType });
  }
}

export function ControllerFactory<T, C, U>(
  createDto: Type<C>,
  updateDto: Type<U>,
): ClassType<CrudController<T, C, U>> {
  const createPipe = new AbstractValidationPipe(
    { whitelist: true, transform: true },
    { body: createDto },
  );
  const updatePipe = new AbstractValidationPipe(
    { whitelist: true, transform: true },
    { body: updateDto },
  );

  class RestController<T, C, U> implements CrudController<T, C, U> {
    protected service: CommonCrudService<T, C, U>;
    protected responseFactory: ResponseFactory;

    @Post()
    @UsePipes(createPipe)
    create(@Body() body: C): Promise<T> {
      return this.service.create(body);
    }

    @Get(`/:id(${REGEX_UUID_VALIDATION})`)
    findOne(@Param('id') id: string): Promise<T> {
      return this.service.findOne(id);
    }

    @Get()
    findAll(): Promise<T[]> {
      return this.service.findAll();
    }

    @Delete(`/:id(${REGEX_UUID_VALIDATION})`)
    remove(@Param('id') id: string): Promise<T | DeleteResult> {
      return this.service.remove(id);
    }

    @Patch(`/:id(${REGEX_UUID_VALIDATION})`)
    @UsePipes(updatePipe)
    update(
      @Param('id') id: string,
      @Body() body: U,
    ): Promise<T | UpdateResult> {
      return this.service.update(id, body);
    }
  }

  return RestController;
}
