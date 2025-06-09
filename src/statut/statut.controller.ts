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
import { CreateStatutDto } from './dto/create-statut.dto';
import { UpdateStatutDto } from './dto/update-statut.dto';
import { Statut } from './entities/statut.entity';
import { StatutService } from './statut.service';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/enums/roles.enum';
import { REGEX_UUID_VALIDATION } from 'src/common/Regex';

@ApiTags('statut')
@Controller('statut')
@UseGuards(AuthGuard('jwt'), RoleGuard)
@ApiBearerAuth()
export class StatutController {
  constructor(protected readonly statutService: StatutService) {}

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get all statuts.',
    summary: 'Get all statuts',
  })
  @ApiOkResponse({ description: 'A list of statuts' })
  findAll(): Promise<Statut[]> {
    return this.statutService.findAll();
  }

  @Get(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get statut by id.',
    summary: 'Get statut by id',
  })
  @ApiOkResponse({ description: 'A statut' })
  findOne(@Param('id') id: string): Promise<Statut> {
    return this.statutService.findOne(id);
  }

  @Post()
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Create a new statut.',
    summary: 'Create new statut',
  })
  @ApiCreatedResponse({ description: 'A new statut' })
  async create(@Body() createStatutDto: CreateStatutDto): Promise<Statut> {
    return await this.statutService.create(createStatutDto);
  }

  @Patch(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Update statut by id.',
    summary: 'Update statut by id',
  })
  @ApiOkResponse({ description: 'TypeORM update result for statut' })
  async update(
    @Param('id') id: string,
    @Body() updateStatutDto: UpdateStatutDto,
  ): Promise<UpdateResult> {
    return await this.statutService.update(id, updateStatutDto);
  }

  @Delete(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Delete statut by id.',
    summary: 'Delete statut by id',
  })
  @ApiOkResponse({ description: 'TypeORM delete result for statut' })
  async remove(
    @Param('id')
    id: string,
  ): Promise<DeleteResult> {
    return await this.statutService.remove(id);
  }
}
