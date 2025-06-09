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
import { GrupaSangvinaService } from './grupa-sangvina.service';
import { CreateGrupaSangvinaDto } from './dto/create-grupa-sangvina.dto';
import { UpdateGrupaSangvinaDto } from './dto/update-grupa-sangvina.dto';
import { GrupaSangvina } from './entities/grupa-sangvina.entity';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateResult, DeleteResult } from 'typeorm';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/enums/roles.enum';
import { REGEX_UUID_VALIDATION } from 'src/common/Regex';

@ApiTags('grupa-sangvina')
@Controller('grupa-sangvina')
@UseGuards(AuthGuard('jwt'), RoleGuard)
@ApiBearerAuth()
export class GrupaSangvinaController {
  constructor(protected readonly grupaSangvinaService: GrupaSangvinaService) {}

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get all grupaSangvina.',
    summary: 'Get all grupaSangvina',
  })
  @ApiOkResponse({ description: 'A list of grupaSangvina' })
  async findAll(): Promise<GrupaSangvina[]> {
    return await this.grupaSangvinaService.findAll();
  }

  @Get(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get grupaSangvina by id.',
    summary: 'Get grupaSangvina by id',
  })
  @ApiOkResponse({ description: 'A grupaSangvina' })
  async findOne(@Param('id') id: string): Promise<GrupaSangvina> {
    return this.grupaSangvinaService.findOne(id);
  }

  @Post()
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Create a new grupaSangvina.',
    summary: 'Create a grupaSangvina',
  })
  @ApiCreatedResponse({ description: 'A new grupaSangvina' })
  async create(
    @Body() createGrupaSangvinaDto: CreateGrupaSangvinaDto,
  ): Promise<GrupaSangvina> {
    return await this.grupaSangvinaService.create(createGrupaSangvinaDto);
  }

  @Patch(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Update a grupaSangvina.',
    summary: 'Update a grupaSangvina',
  })
  @ApiOkResponse({ description: 'A updated grupaSangvina' })
  async update(
    @Param('id') id: string,
    @Body() updateGrupaSangvinaDto: UpdateGrupaSangvinaDto,
  ): Promise<UpdateResult> {
    return await this.grupaSangvinaService.update(id, updateGrupaSangvinaDto);
  }

  @Delete(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Delete a grupaSangvina.',
    summary: 'Delete a grupaSangvina',
  })
  @ApiOkResponse({ description: 'A deleted grupaSangvina' })
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return await this.grupaSangvinaService.remove(id);
  }
}
