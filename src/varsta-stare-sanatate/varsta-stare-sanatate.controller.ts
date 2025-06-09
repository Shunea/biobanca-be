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
import { CreateVarstaStareSanatateDto } from './dto/create-varsta-stare-sanatate.dto';
import { VarstaStareSanatate } from './entities/varsta-stare-sanatate.entity';
import { VarstaStareSanatateService } from './varsta-stare-sanatate.service';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/enums/roles.enum';
import { REGEX_UUID_VALIDATION } from 'src/common/Regex';

@ApiTags('varsta-stare-sanatate')
@Controller('varsta-stare-sanatate')
@UseGuards(AuthGuard('jwt'), RoleGuard)
@ApiBearerAuth()
export class VarstaStareSanatateController {
  constructor(protected readonly VarstaStareSanatateService: VarstaStareSanatateService) {}

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get all unitati masura.',
    summary: 'Get all unitati masura',
  })
  @ApiOkResponse({ description: 'A list of unitati masura' })
  async findAll(): Promise<VarstaStareSanatate[]> {
    return this.VarstaStareSanatateService.findAll();
  }

  @Get(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get unitate masura by id.',
    summary: 'Get unitate masura by id',
  })
  @ApiOkResponse({ description: 'An unitate masura' })
  async findOne(@Param('id') id: string): Promise<VarstaStareSanatate> {
    return this.VarstaStareSanatateService.findOne(id);
  }

  @Post()
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Create a new unitate masura.',
    summary: 'Create an unitate masura',
  })
  @ApiCreatedResponse({ description: 'A new unitate masura' })
  async create(
    @Body() createVarstaStareSanatateDto: CreateVarstaStareSanatateDto,
  ): Promise<VarstaStareSanatate> {
    return this.VarstaStareSanatateService.create(createVarstaStareSanatateDto);
  }

  @Patch(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Update an unitate masura.',
    summary: 'Update an unitate masura',
  })
  @ApiOkResponse({ description: 'TypeORM update result for unitate masura' })
  async update(
    @Param('id') id: string,
    @Body() updateVarstaStareSanatateDto: CreateVarstaStareSanatateDto,
  ): Promise<UpdateResult> {
    return this.VarstaStareSanatateService.update(id, updateVarstaStareSanatateDto);
  }

  @Delete(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Delete an unitate masura.',
    summary: 'Delete an unitate masura',
  })
  @ApiOkResponse({ description: 'TypeORM delete result for unitate masura' })
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.VarstaStareSanatateService.remove(id);
  }
}
