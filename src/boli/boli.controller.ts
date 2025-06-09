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
import { BoliService } from './boli.service';
import { CreateBoliDto } from './dto/create-boli.dto';
import { UpdateBoliDto } from './dto/update-boli.dto';
import { Boli } from './entities/boli.entity';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/enums/roles.enum';
import { REGEX_UUID_VALIDATION } from 'src/common/Regex';

@ApiTags('boli')
@Controller('boli')
@UseGuards(AuthGuard('jwt'), RoleGuard)
@ApiBearerAuth()
export class BoliController {
  constructor(protected readonly boliService: BoliService) {}

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get all boli.',
    summary: 'Get all boli',
  })
  @ApiOkResponse({ description: 'A list of boli' })
  async findAll(): Promise<Boli[]> {
    return this.boliService.findAll();
  }

  @Get(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get boli by id.',
    summary: 'Get boli by id',
  })
  @ApiOkResponse({ description: 'A boli' })
  async findOne(@Param('id') id: string): Promise<Boli> {
    return this.boliService.findOne(id);
  }

  @Post()
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Create a new boli.',
    summary: 'Create an boli',
  })
  @ApiCreatedResponse({ description: 'A new boli' })
  async create(@Body() createBoliDto: CreateBoliDto): Promise<Boli> {
    return this.boliService.create(createBoliDto);
  }

  @Patch(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Update an boli.',
    summary: 'Update an boli',
  })
  @ApiOkResponse({ description: 'TypeORM update result for boli' })
  async update(
    @Param('id') id: string,
    @Body() updateBoliDto: UpdateBoliDto,
  ): Promise<UpdateResult> {
    return this.boliService.update(id, updateBoliDto);
  }

  @Delete(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Delete an boli.',
    summary: 'Delete an boli',
  })
  @ApiOkResponse({ description: 'TypeORM delete result for boli' })
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.boliService.remove(id);
  }
}
