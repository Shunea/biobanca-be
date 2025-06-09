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
import { CreateLocalitateDto } from './dto/create-localitate.dto';
import { UpdateLocalitateDto } from './dto/update-localitate.dto';
import { Localitate } from './entity/localitate.entity';
import { LocalitateService } from './localitate.service';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/enums/roles.enum';
import { REGEX_UUID_VALIDATION } from 'src/common/Regex';

@ApiTags('localitate')
@Controller('localitate')
@UseGuards(AuthGuard('jwt'), RoleGuard)
@ApiBearerAuth()
export class LocalitateController {
  constructor(protected readonly localitateService: LocalitateService) {}

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get all localitate.',
    summary: 'Get all localitate',
  })
  @ApiOkResponse({ description: 'A list of localitate' })
  async findAll(): Promise<Localitate[]> {
    return await this.localitateService.findAll();
  }

  @Get(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get localitate by id.',
    summary: 'Get localitate by id',
  })
  @ApiOkResponse({ description: 'A localitate' })
  async findOne(@Param('id') id: string): Promise<Localitate> {
    return this.localitateService.findOne(id);
  }

  @Post()
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Create a new localitate.',
    summary: 'Create a localitate',
  })
  @ApiCreatedResponse({ description: 'A new localitate' })
  async create(
    @Body() createLocalitateDto: CreateLocalitateDto,
  ): Promise<Localitate> {
    return await this.localitateService.create(createLocalitateDto);
  }

  @Patch(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Update a localitate.',
    summary: 'Update a localitate',
  })
  @ApiOkResponse({ description: 'A localitate' })
  async update(
    @Param('id') id: string,
    @Body() updateLocalitateDto: UpdateLocalitateDto,
  ): Promise<UpdateResult> {
    return await this.localitateService.update(id, updateLocalitateDto);
  }

  @Delete(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Delete a localitate.',
    summary: 'Delete a localitate',
  })
  @ApiOkResponse({ description: 'A localitate' })
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return await this.localitateService.remove(id);
  }
}
