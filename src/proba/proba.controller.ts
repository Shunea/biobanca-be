import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  UseGuards,
  Res,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProbaService } from './proba.service';
import { CreateProbaDto } from './dto/create-proba.dto';
import { UpdateProbaDto } from './dto/update-proba.dto';
import { CrudController } from 'src/common/controller/commonRest.controller';
import { RoleGuard } from 'src/auth/role.guard';
import { AuthGuard } from '@nestjs/passport';
import { UserCtx } from 'src/common/user-context';
import { User } from 'src/user/entities/user.entity';
import { Response } from 'express';
import { Proba } from './entities/proba.entity';
import { ResponseFactory } from 'src/common/ResponseFactory';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/enums/roles.enum';
import { REGEX_UUID_VALIDATION } from 'src/common/Regex';

@ApiTags('proba')
@Controller('proba')
@UseGuards(AuthGuard('jwt'), RoleGuard)
@ApiBearerAuth()
export class ProbaController {
  constructor(
    private readonly probaService: ProbaService,
    protected readonly responseFactory: ResponseFactory,
  ) {}

  @Post()
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Create new proba',
    summary: 'Create new proba',
  })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'A new proba' })
  async create(@Body() createProbaDto: CreateProbaDto) {
    return await this.probaService.create(createProbaDto);
  }

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get all probas',
    summary: 'Get all probas',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'A list of probas' })
  async findAll() {
    const res = await this.probaService.findAll();
    return res;
  }

  @Get('/dynamic-statistic')
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  async dynamicStatistic(
    @UserCtx() user: User,
    @Res() response: Response,
    @Query() { filter }: { filter: any },
  ) {
    const result = await this.probaService.dynamicStatistic(filter, user);

    return this.responseFactory.answer(
      HttpStatus.OK,
      { result },
      response,
      'Proba controller GET dynamicStatistic',
    );
  }

  @Get('/filter')
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  async getAllByFilter(
    @Res() response: Response,
    @Query() { filter }: { filter: any },
  ) {
    const res = await this.probaService.getAllByFilter(filter);

    return this.responseFactory.answer(
      HttpStatus.OK,
      { result: res },
      response,
      'Proba controller GET by filter',
    );
  }

  @Get('/last')
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get last proba',
    summary: 'Get last proba',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Last proba' })
  async getLastProba() {
    const res = await this.probaService.getLastProba();
    return res;
  }
  
  @Get('/arhiva')
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Get arhiva probe',
    summary: 'Get arhiva probe',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'Arhiva probe' })
  async getArhivaProbe(
    @UserCtx() user: User,
    @Query() { limit, page, filter }: { limit: number; page: number; filter: any},
  ) {
    return await this.probaService.getArhivaProbe(limit, page, filter, user);
  }

  @Get('/paginated')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  async getPaginated(
    @UserCtx() user: User,
    @Query()
    { limit, page, filter }: { limit: number; page: number; filter: any },
  ) {
    const res = await this.probaService.getPaginated(limit, page, filter, user);

    return res;
  }

  @Get('/field')
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  async getAllByField(
    @Res() response: Response,
    @Query('field') field: string,
    @UserCtx() user: User,
  ) {
    const res = await this.probaService.getAllByField(field, user);

    return this.responseFactory.answer(
      HttpStatus.OK,
      { result: res },
      response,
      'Proba controller GET by field',
    );
  }

  @Get(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get proba by id',
    summary: 'Get proba by id',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'A proba' })
  findOne(@Param('id') id: string) {
    return this.probaService.findOne(id);
  }

  @Patch(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Update proba by id',
    summary: 'Update proba by id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'TypeORM update result for proba',
  })
  updateProba(
    @UserCtx() user: User,
    @Param('id') id: string,
    @Body() updateProbaDto: UpdateProbaDto
  ) {
    return this.probaService.updateProba(id, updateProbaDto, user);
  }

  @Delete(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Delete proba by id',
    summary: 'Delete proba by id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'TypeORM delete result for proba',
  })
  remove(@Param('id') id: string,  @Body() body: any) {
    return this.probaService.remove(id, body);
  }
}
