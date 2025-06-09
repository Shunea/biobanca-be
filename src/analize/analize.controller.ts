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
import { CreateAnalizeDto } from './dto/create-analize.dto';
import { UpdateAnalizeDto } from './dto/update-analize.dto';
import { Analize } from './entities/analize.entity';
import { AnalizeService } from './analize.service';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/enums/roles.enum';
import { REGEX_UUID_VALIDATION } from 'src/common/Regex';

@ApiTags('analize')
@Controller('analize')
@UseGuards(AuthGuard('jwt'), RoleGuard)
@ApiBearerAuth()
export class AnalizeController {
  constructor(protected readonly AnalizeService: AnalizeService) {}

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get all Analizes',
    summary: 'Get all Analizes',
  })
  @ApiOkResponse({
    description: 'A list of Analizes',
  })
  findAll(): Promise<Analize[]> {
    return this.AnalizeService.findAll();
  }

  @Get(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get Analize by id',
    summary: 'Get Analize by id',
  })
  @ApiOkResponse({
    description: 'A Analize',
  })
  findOne(@Param('id') id: string): Promise<Analize> {
    return this.AnalizeService.findOne(id);
  }

  @Post()
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Create new Analize',
    summary: 'Create new Analize',
  })
  @ApiCreatedResponse({
    description: 'A new Analize',
  })
  create(@Body() createAnalizeDto: CreateAnalizeDto): Promise<Analize> {
    return this.AnalizeService.create(createAnalizeDto);
  }

  @Patch(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Update Analize by id',
    summary: 'Update Analize by id',
  })
  @ApiOkResponse({
    description: 'TypeORM update result for Analize',
  })
  update(
    @Param('id') id: string,
    @Body() updateAnalizeDto: UpdateAnalizeDto,
  ): Promise<UpdateResult> {
    return this.AnalizeService.update(id, updateAnalizeDto);
  }

  @Delete(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Delete Analize by id',
    summary: 'Delete Analize by id',
  })
  @ApiOkResponse({
    description: 'TypeORM delete result for Analize',
  })
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.AnalizeService.remove(id);
  }
}