import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateUnitatiMasuraDto } from './dto/create-unitati-masura.dto';
import { UnitatiMasura } from './entities/unitati-masura.entity';
import { UnitatiMasuraService } from './unitati-masura.service';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/enums/roles.enum';
import { REGEX_UUID_VALIDATION } from 'src/common/Regex';

@ApiTags('unitati-masura')
@Controller('unitati-masura')
@UseGuards(AuthGuard('jwt'), RoleGuard)
@ApiBearerAuth()
export class UnitatiMasuraController {
  constructor(protected readonly unitatiMasuraService: UnitatiMasuraService) {}

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get all unitati masura.',
    summary: 'Get all unitati masura',
  })
  @ApiOkResponse({ description: 'A list of unitati masura' })
  async findAll(): Promise<UnitatiMasura[]> {
    return this.unitatiMasuraService.findAll();
  }

  @Get(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get unitate masura by id.',
    summary: 'Get unitate masura by id',
  })
  @ApiOkResponse({ description: 'An unitate masura' })
  async findOne(@Param('id') id: string): Promise<UnitatiMasura> {
    return this.unitatiMasuraService.findOne(id);
  }

  @Post()
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Create a new unitate masura.',
    summary: 'Create an unitate masura',
  })
  @ApiCreatedResponse({ description: 'A new unitate masura' })
  async create(
    @Body() createUnitatiMasuraDto: CreateUnitatiMasuraDto,
  ): Promise<UnitatiMasura> {
    return this.unitatiMasuraService.create(createUnitatiMasuraDto);
  }

  @Patch(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Update an unitate masura.',
    summary: 'Update an unitate masura',
  })
  @ApiOkResponse({ description: 'TypeORM update result for unitate masura' })
  async update(
    @Param('id') id: string,
    @Body() updateUnitatiMasuraDto: CreateUnitatiMasuraDto,
  ): Promise<UpdateResult> {
    return this.unitatiMasuraService.update(id, updateUnitatiMasuraDto);
  }

  @Delete(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Delete an unitate masura.',
    summary: 'Delete an unitate masura',
  })
  @ApiOkResponse({ description: 'TypeORM delete result for unitate masura' })
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.unitatiMasuraService.remove(id);
  }
}
