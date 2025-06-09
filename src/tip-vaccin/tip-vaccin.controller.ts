import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { TipVaccinService } from './tip-vaccin.service';
import { UpdateResult, DeleteResult } from 'typeorm';
import { CreateTipVaccinDto } from './dto/create-tip-vaccin.dto';
import { UpdateTipVaccinDto } from './dto/update-tip-vaccin.dto';
import { TipVaccin } from './entities/tip-vaccin.entity';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/enums/roles.enum';
import { REGEX_UUID_VALIDATION } from 'src/common/Regex';

@ApiTags('tip-vaccin')
@Controller('tip-vaccin')
@UseGuards(AuthGuard('jwt'), RoleGuard)
@ApiBearerAuth()
export class TipVaccinController {
  constructor(protected readonly tipVaccinService: TipVaccinService) {}

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get all TipVaccin.',
    summary: 'Get all TipVaccin',
  })
  @ApiOkResponse({ description: 'A list of TipVaccin' })
  async findAll(): Promise<TipVaccin[]> {
    return this.tipVaccinService.findAll();
  }

  @Get(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get TipVaccin by id.',
    summary: 'Get TipVaccin by id',
  })
  @ApiOkResponse({ description: 'A TipVaccin' })
  async findOne(@Param('id') id: string): Promise<TipVaccin> {
    return this.tipVaccinService.findOne(id);
  }

  @Post()
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Create a new TipVaccin.',
    summary: 'Create an TipVaccin',
  })
  @ApiCreatedResponse({ description: 'A new TipVaccin' })
  async create(@Body() createTipVaccinDto: CreateTipVaccinDto): Promise<TipVaccin> {
    return this.tipVaccinService.create(createTipVaccinDto);
  }

  @Patch(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Update an TipVaccin.',
    summary: 'Update an TipVaccin',
  })
  @ApiOkResponse({ description: 'TypeORM update result for TipVaccin' })
  async update(
    @Param('id') id: string,
    @Body() updateTipVaccinDto: UpdateTipVaccinDto,
  ): Promise<UpdateResult> {
    return this.tipVaccinService.update(id, updateTipVaccinDto);
  }

  @Delete(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Delete an TipVaccin.',
    summary: 'Delete an TipVaccin',
  })
  @ApiOkResponse({ description: 'TypeORM delete result for TipVaccin' })
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.tipVaccinService.remove(id);
  }
}
