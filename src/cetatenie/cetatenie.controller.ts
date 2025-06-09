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
import { CreateCetatenieDto } from './dto/create-cetatenie.dto';
import { UpdateCetatenieDto } from './dto/update-cetatenie.dto';
import { Cetatenie } from './entities/cetatenie.entity';
import { CetatenieService } from './cetatenie.service';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/enums/roles.enum';
import { REGEX_UUID_VALIDATION } from 'src/common/Regex';

@ApiTags('cetatenie')
@Controller('cetatenie')
@UseGuards(AuthGuard('jwt'), RoleGuard)
@ApiBearerAuth()
export class CetatenieController {
  constructor(protected readonly CetatenieService: CetatenieService) {}

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get all Cetatenies',
    summary: 'Get all Cetatenies',
  })
  @ApiOkResponse({
    description: 'A list of Cetatenies',
  })
  findAll(): Promise<Cetatenie[]> {
    return this.CetatenieService.findAll();
  }

  @Get(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get Cetatenie by id',
    summary: 'Get Cetatenie by id',
  })
  @ApiOkResponse({
    description: 'A Cetatenie',
  })
  findOne(@Param('id') id: string): Promise<Cetatenie> {
    return this.CetatenieService.findOne(id);
  }

  @Post()
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Create new Cetatenie',
    summary: 'Create new Cetatenie',
  })
  @ApiCreatedResponse({
    description: 'A new Cetatenie',
  })
  create(@Body() createCetatenieDto: CreateCetatenieDto): Promise<Cetatenie> {
    return this.CetatenieService.create(createCetatenieDto);
  }

  @Patch(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Update Cetatenie by id',
    summary: 'Update Cetatenie by id',
  })
  @ApiOkResponse({
    description: 'TypeORM update result for Cetatenie',
  })
  update(
    @Param('id') id: string,
    @Body() updateCetatenieDto: UpdateCetatenieDto,
  ): Promise<UpdateResult> {
    return this.CetatenieService.update(id, updateCetatenieDto);
  }

  @Delete(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Delete Cetatenie by id',
    summary: 'Delete Cetatenie by id',
  })
  @ApiOkResponse({
    description: 'TypeORM delete result for Cetatenie',
  })
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.CetatenieService.remove(id);
  }
}