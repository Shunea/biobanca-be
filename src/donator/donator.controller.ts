import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpStatus,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserCtx } from 'src/common/user-context';
import { User } from 'src/user/entities/user.entity';
import { DonatorService } from './donator.service';
import { CreateDonatorDto } from './dto/create-donator.dto';
import { UpdateDonatorDto } from './dto/update-donator.dto';
import { Response } from 'express';
import { ResponseFactory } from 'src/common/ResponseFactory';
import { RoleGuard } from 'src/auth/role.guard';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/enums/roles.enum';
import { REGEX_UUID_VALIDATION } from 'src/common/Regex';

@ApiTags('donator')
@Controller('donator')
@UseGuards(AuthGuard('jwt'), RoleGuard)
@ApiBearerAuth()
export class DonatorController {
  constructor(
    private readonly donatorService: DonatorService,
    protected readonly responseFactory: ResponseFactory,
  ) {}

  @Post()
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Create new donor',
    summary: 'Create new donor',
  })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'A new donor' })
  async create(@Body() createDonatorDto: CreateDonatorDto) {
    return await this.donatorService.create(createDonatorDto);
  }

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get all donors',
    summary: 'Get all donors',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'A list of donors' })
  findAll() {
    return this.donatorService.findAll();
  }

  @Get('/dynamic-statistic')
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  async dynamicStatistic(
    @Res() response: Response,
    @Query() { filter }: { filter: any },
    @UserCtx() user: User
  ) {
    const result = await this.donatorService.dynamicStatistic(filter, user);

    return this.responseFactory.answer(
      HttpStatus.OK,
      { result },
      response,
      'Donator controller GET dynamicStatistic',
    );
  }
  
  @Get('/paginated')
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  async getPaginated(
    @UserCtx() user: User,
    @Query()
    { limit, page, filter }: { limit: number; page: number; filter: any },
  ) {
    const res = await this.donatorService.getPaginated(limit, page, filter, user);

    return res;
  }

  @Get('/field')
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  async getAllByField(
    @Res() response: Response,
    @Query('field') field: string,
    @UserCtx() user: User,
  ) {
    const res = await this.donatorService.getAllByField(field, user);
    return this.responseFactory.answer(
      HttpStatus.OK,
      { result: res },
      response,
      'Donator controller GET by field',
    );
  }
  
  @Get('/idnp')
  @Roles(Role.SUPER_ADMIN)
  async getDonatorByIDNP(
    @Query('idnp') idnp: string,
  ) {
    return await this.donatorService.getDonatorByIDNP(idnp);
  }

  @Get(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get donor by id',
    summary: 'Get donor by id',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'A donor' })
  findOneById(
    @Param('id') id: string,
    @UserCtx() user: User
  ) {
    return this.donatorService.findOneById(id, user);
  }

  @Patch(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Update donor by id',
    summary: 'Update donor by id',
  })
  @ApiParam({ name: 'id', description: 'Donor id', required: true })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'TypeORM update result for donor',
  })
  update(@Param('id') id: string, @Body() updateDonatorDto: UpdateDonatorDto) {
    return this.donatorService.update(id, updateDonatorDto);
  }

  @Delete(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Delete donor by id',
    summary: 'Delete donor by id',
  })
  @ApiParam({ name: 'id', description: 'Donor id', required: true })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'TypeORM delete result for donor',
  })
  remove(@Param('id') id: string) {
    return this.donatorService.remove(id);
  }

 
}
