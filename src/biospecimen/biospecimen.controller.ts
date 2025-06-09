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
import { BiospecimenService } from './biospecimen.service';
import { CreateBiospecimenDto } from './dto/create-biospecimen.dto';
import { Biospecimen } from './entities/biospecimen.entity';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/enums/roles.enum';
import { REGEX_UUID_VALIDATION } from 'src/common/Regex';

@ApiTags('biospecimen')
@Controller('biospecimen')
@UseGuards(AuthGuard('jwt'), RoleGuard)
@ApiBearerAuth()
export class BiospecimenController {
  constructor(private readonly biospecimenService: BiospecimenService) {}

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get all biospecimen.',
    summary: 'Get all biospecimen',
  })
  @ApiOkResponse({ description: 'A list of biospecimen' })
  async findAll(): Promise<Biospecimen[]> {
    return this.biospecimenService.findAll();
  }

  @Get(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get biospecimen by id.',
    summary: 'Get biospecimen by id',
  })
  @ApiOkResponse({ description: 'An biospecimen' })
  async findOne(@Param('id') id: string): Promise<Biospecimen> {
    return this.biospecimenService.findOne(id);
  }

  @Post()
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Create a new biospecimen.',
    summary: 'Create an biospecimen',
  })
  @ApiCreatedResponse({ description: 'A new biospecimen' })
  async create(
    @Body()
    createBiospecimenDto: CreateBiospecimenDto,
  ): Promise<Biospecimen> {
    return this.biospecimenService.create(createBiospecimenDto);
  }

  @Patch(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Update an biospecimen.',
    summary: 'Update an biospecimen',
  })
  @ApiOkResponse({ description: 'TypeORM update result for biospecimen' })
  async update(
    @Param('id') id: string,
    @Body() updateBiospecimenDto: CreateBiospecimenDto,
  ): Promise<UpdateResult> {
    return this.biospecimenService.update(id, updateBiospecimenDto);
  }

  @Delete(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Delete an biospecimen.',
    summary: 'Delete an biospecimen',
  })
  @ApiOkResponse({ description: 'TypeORM delete result for biospecimen' })
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.biospecimenService.remove(id);
  }
}
