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
import { UpdateResult, DeleteResult } from 'typeorm';
import { AntecedenteEredocolateraleService } from './antecedente-eredocolaterale.service';
import { CreateAntecedenteEredocolateraleDto } from './dto/create-antecedente-eredocolaterale.dto';
import { UpdateAntecedenteEredocolateraleDto } from './dto/update-antecedente-eredocolaterale.dto';
import { AntecedenteEredocolaterale } from './entities/antecedente-eredocolaterale.entity';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/enums/roles.enum';
import { REGEX_UUID_VALIDATION } from 'src/common/Regex';

@ApiTags('antecedente-eredocolaterale')
@Controller('antecedente-eredocolaterale')
@UseGuards(AuthGuard('jwt'), RoleGuard)
@ApiBearerAuth()
export class AntecedenteEredocolateraleController {
  constructor(protected readonly AntecedenteEredocolateraleService: AntecedenteEredocolateraleService) {}

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get all AntecedenteEredocolaterale.',
    summary: 'Get all AntecedenteEredocolaterale',
  })
  @ApiOkResponse({ description: 'A list of AntecedenteEredocolaterale' })
  async findAll(): Promise<AntecedenteEredocolaterale[]> {
    return this.AntecedenteEredocolateraleService.findAll();
  }

  @Get(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get AntecedenteEredocolaterale by id.',
    summary: 'Get AntecedenteEredocolaterale by id',
  })
  @ApiOkResponse({ description: 'A AntecedenteEredocolaterale' })
  async findOne(@Param('id') id: string): Promise<AntecedenteEredocolaterale> {
    return this.AntecedenteEredocolateraleService.findOne(id);
  }

  @Post()
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Create a new AntecedenteEredocolaterale.',
    summary: 'Create an AntecedenteEredocolaterale',
  })
  @ApiCreatedResponse({ description: 'A new AntecedenteEredocolaterale' })
  async create(@Body() createAntecedenteEredocolateraleDto: CreateAntecedenteEredocolateraleDto): Promise<AntecedenteEredocolaterale> {
    return this.AntecedenteEredocolateraleService.create(createAntecedenteEredocolateraleDto);
  }

  @Patch(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Update an AntecedenteEredocolaterale.',
    summary: 'Update an AntecedenteEredocolaterale',
  })
  @ApiOkResponse({ description: 'TypeORM update result for AntecedenteEredocolaterale' })
  async update(
    @Param('id') id: string,
    @Body() updateAntecedenteEredocolateraleDto: UpdateAntecedenteEredocolateraleDto,
  ): Promise<UpdateResult> {
    return this.AntecedenteEredocolateraleService.update(id, updateAntecedenteEredocolateraleDto);
  }

  @Delete(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Delete an AntecedenteEredocolaterale.',
    summary: 'Delete an AntecedenteEredocolaterale',
  })
  @ApiOkResponse({ description: 'TypeORM delete result for AntecedenteEredocolaterale' })
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.AntecedenteEredocolateraleService.remove(id);
  }
}
