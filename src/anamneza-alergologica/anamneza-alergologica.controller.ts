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
import { AnamnezaAlergologicaService } from './anamneza-alergologica.service';
import { CreateAnamnezaAlergologicaDto } from './dto/create-anamneza-alergologica.dto';
import { AnamnezaAlergologica } from './entities/anamneza-alergologica.entity';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/enums/roles.enum';
import { REGEX_UUID_VALIDATION } from 'src/common/Regex';

@ApiTags('anamneza-alergologica')
@Controller('anamneza-alergologica')
@UseGuards(AuthGuard('jwt'), RoleGuard)
@ApiBearerAuth()
export class AnamnezaAlergologicaController {
  constructor(private readonly AnamnezaAlergologicaService: AnamnezaAlergologicaService) {}

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get all AnamnezaAlergologica.',
    summary: 'Get all AnamnezaAlergologica',
  })
  @ApiOkResponse({ description: 'A list of AnamnezaAlergologica' })
  async findAll(): Promise<AnamnezaAlergologica[]> {
    return this.AnamnezaAlergologicaService.findAll();
  }

  @Get(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get AnamnezaAlergologica by id.',
    summary: 'Get AnamnezaAlergologica by id',
  })
  @ApiOkResponse({ description: 'An AnamnezaAlergologica' })
  async findOne(@Param('id') id: string): Promise<AnamnezaAlergologica> {
    return this.AnamnezaAlergologicaService.findOne(id);
  }

  @Post()
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Create a new AnamnezaAlergologica.',
    summary: 'Create an AnamnezaAlergologica',
  })
  @ApiCreatedResponse({ description: 'A new AnamnezaAlergologica' })
  async create(
    @Body()
    createAnamnezaAlergologicaDto: CreateAnamnezaAlergologicaDto,
  ): Promise<AnamnezaAlergologica> {
    return this.AnamnezaAlergologicaService.create(createAnamnezaAlergologicaDto);
  }

  @Patch(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Update an AnamnezaAlergologica.',
    summary: 'Update an AnamnezaAlergologica',
  })
  @ApiOkResponse({ description: 'TypeORM update result for AnamnezaAlergologica' })
  async update(
    @Param('id') id: string,
    @Body() updateAnamnezaAlergologicaDto: CreateAnamnezaAlergologicaDto,
  ): Promise<UpdateResult> {
    return this.AnamnezaAlergologicaService.update(id, updateAnamnezaAlergologicaDto);
  }

  @Delete(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Delete an AnamnezaAlergologica.',
    summary: 'Delete an AnamnezaAlergologica',
  })
  @ApiOkResponse({ description: 'TypeORM delete result for AnamnezaAlergologica' })
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.AnamnezaAlergologicaService.remove(id);
  }
}
