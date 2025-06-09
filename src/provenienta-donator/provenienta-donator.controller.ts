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
import { ProvenientaDonatorService } from './provenienta-donator.service';
import { CreateProvenientaDonatorDto } from './dto/create-provenienta-donator.dto';
import { UpdateProvenientaDonatorDto } from './dto/update-provenienta-donator.dto';
import { ProvenientaDonator } from './entities/provenienta-donator.entity';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/enums/roles.enum';
import { REGEX_UUID_VALIDATION } from 'src/common/Regex';

@ApiTags('provenienta-donator')
@Controller('provenienta-donator')
@UseGuards(AuthGuard('jwt'), RoleGuard)
@ApiBearerAuth()
export class ProvenientaDonatorController {
  constructor(protected readonly ProvenientaDonatorService: ProvenientaDonatorService) {}

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get all ProvenientaDonator.',
    summary: 'Get all ProvenientaDonator',
  })
  @ApiOkResponse({ description: 'A list of ProvenientaDonator' })
  async findAll(): Promise<ProvenientaDonator[]> {
    return this.ProvenientaDonatorService.findAll();
  }

  @Get(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get ProvenientaDonator by id.',
    summary: 'Get ProvenientaDonator by id',
  })
  @ApiOkResponse({ description: 'A ProvenientaDonator' })
  async findOne(@Param('id') id: string): Promise<ProvenientaDonator> {
    return this.ProvenientaDonatorService.findOne(id);
  }

  @Post()
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Create a new ProvenientaDonator.',
    summary: 'Create an ProvenientaDonator',
  })
  @ApiCreatedResponse({ description: 'A new ProvenientaDonator' })
  async create(@Body() createProvenientaDonatorDto: CreateProvenientaDonatorDto): Promise<ProvenientaDonator> {
    return this.ProvenientaDonatorService.create(createProvenientaDonatorDto);
  }

  @Patch(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Update an ProvenientaDonator.',
    summary: 'Update an ProvenientaDonator',
  })
  @ApiOkResponse({ description: 'TypeORM update result for ProvenientaDonator' })
  async update(
    @Param('id') id: string,
    @Body() updateProvenientaDonatorDto: UpdateProvenientaDonatorDto,
  ): Promise<UpdateResult> {
    return this.ProvenientaDonatorService.update(id, updateProvenientaDonatorDto);
  }

  @Delete(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Delete an ProvenientaDonator.',
    summary: 'Delete an ProvenientaDonator',
  })
  @ApiOkResponse({ description: 'TypeORM delete result for ProvenientaDonator' })
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.ProvenientaDonatorService.remove(id);
  }
}
