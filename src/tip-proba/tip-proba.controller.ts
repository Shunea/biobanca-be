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
import { TipProbaService } from './tip-proba.service';
import { CreateTipProbaDto } from './dto/create-tip-proba.dto';
import { TipProba } from './entity/tip-proba.entity';
import { UpdateTipProbaDto } from './dto/update-tip-proba.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/enums/roles.enum';
import { REGEX_UUID_VALIDATION } from 'src/common/Regex';

@ApiTags('tip-proba')
@Controller('tip-proba')
@UseGuards(AuthGuard('jwt'), RoleGuard)
@ApiBearerAuth()
export class TipProbaController {
  constructor(private readonly tipProbaService: TipProbaService) {}
  @Get()
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get all TipProbas',
    summary: 'Get all TipProbas',
  })
  @ApiOkResponse({
    description: 'A list of TipProbas',
  })
  findAll(): Promise<TipProba[]> {
    return this.tipProbaService.findAll();
  }

  @Get(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get TipProba by id',
    summary: 'Get TipProba by id',
  })
  @ApiOkResponse({
    description: 'A TipProba',
  })
  findOne(@Param('id') id: string): Promise<TipProba> {
    return this.tipProbaService.findOne(id);
  }
  @Post()
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Create a new tip-proba.',
    summary: 'Create a tip-proba',
  })
  @ApiCreatedResponse({ description: 'A new TipProba' })
  async create(
    @Body() createTipProbaDto: CreateTipProbaDto,
  ): Promise<TipProba> {
    return await this.tipProbaService.create(createTipProbaDto);
  }

  @Patch(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Update a TipProba.',
    summary: 'Update a TipProba',
  })
  @ApiOkResponse({ description: 'A TipProba' })
  async update(
    @Param('id') id: string,
    @Body() updateTipProbaDto: UpdateTipProbaDto,
  ): Promise<UpdateResult> {
    return await this.tipProbaService.update(id, updateTipProbaDto);
  }

  @Delete(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Delete a TipProba.',
    summary: 'Delete a TipProba',
  })
  @ApiOkResponse({ description: 'A TipProba' })
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return await this.tipProbaService.remove(id);
  }
}
