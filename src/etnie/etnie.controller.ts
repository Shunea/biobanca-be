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
import { CreateEtnieDto } from './dto/create-etnie.dto';
import { UpdateEtnieDto } from './dto/update-etnie.dto';
import { Etnie } from './entities/etnie.entity';
import { EtnieService } from './etnie.service';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/enums/roles.enum';
import { REGEX_UUID_VALIDATION } from 'src/common/Regex';

@ApiTags('etnie')
@Controller('etnie')
@UseGuards(AuthGuard('jwt'), RoleGuard)
@ApiBearerAuth()
export class EtnieController {
  constructor(protected readonly EtnieService: EtnieService) {}

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get all Etnies',
    summary: 'Get all Etnies',
  })
  @ApiOkResponse({
    description: 'A list of Etnies',
  })
  findAll(): Promise<Etnie[]> {
    return this.EtnieService.findAll();
  }

  @Get(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get Etnie by id',
    summary: 'Get Etnie by id',
  })
  @ApiOkResponse({
    description: 'A Etnie',
  })
  findOne(@Param('id') id: string): Promise<Etnie> {
    return this.EtnieService.findOne(id);
  }

  @Post()
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Create new Etnie',
    summary: 'Create new Etnie',
  })
  @ApiCreatedResponse({
    description: 'A new Etnie',
  })
  create(@Body() createEtnieDto: CreateEtnieDto): Promise<Etnie> {
    return this.EtnieService.create(createEtnieDto);
  }

  @Patch(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Update Etnie by id',
    summary: 'Update Etnie by id',
  })
  @ApiOkResponse({
    description: 'TypeORM update result for Etnie',
  })
  update(
    @Param('id') id: string,
    @Body() updateEtnieDto: UpdateEtnieDto,
  ): Promise<UpdateResult> {
    return this.EtnieService.update(id, updateEtnieDto);
  }

  @Delete(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Delete Etnie by id',
    summary: 'Delete Etnie by id',
  })
  @ApiOkResponse({
    description: 'TypeORM delete result for Etnie',
  })
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.EtnieService.remove(id);
  }
}