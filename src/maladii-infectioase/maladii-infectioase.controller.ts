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
import { CreateMaladiiInfectioaseDto } from './dto/create-maladii-infectioase.dto';
import { UpdateMaladiiInfectioaseDto } from './dto/update-maladii-infectioase.dto';
import { MaladiiInfectioase } from './entities/maladii-infectioase.entity';
import { MaladiiInfectioaseService } from './maladii-infectioase.service';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/enums/roles.enum';
import { REGEX_UUID_VALIDATION } from 'src/common/Regex';

@ApiTags('maladii-infectioase')
@Controller('maladii-infectioase')
@UseGuards(AuthGuard('jwt'), RoleGuard)
@ApiBearerAuth()
export class MaladiiInfectioaseController {
  constructor(
    protected readonly MaladiiInfectioaseService: MaladiiInfectioaseService,
  ) {}

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get all MaladiiInfectioase.',
    summary: 'Get all MaladiiInfectioase',
  })
  @ApiOkResponse({ description: 'A list of MaladiiInfectioase' })
  async findAll(): Promise<MaladiiInfectioase[]> {
    return this.MaladiiInfectioaseService.findAll();
  }

  @Get(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get MaladiiInfectioase by id.',
    summary: 'Get MaladiiInfectioase by id',
  })
  @ApiOkResponse({ description: 'A MaladiiInfectioase' })
  async findOne(@Param('id') id: string): Promise<MaladiiInfectioase> {
    return this.MaladiiInfectioaseService.findOne(id);
  }

  @Post()
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Create a new MaladiiInfectioase.',
    summary: 'Create an MaladiiInfectioase',
  })
  @ApiCreatedResponse({ description: 'A new MaladiiInfectioase' })
  async create(
    @Body() createMaladiiInfectioaseDto: CreateMaladiiInfectioaseDto,
  ): Promise<MaladiiInfectioase> {
    return this.MaladiiInfectioaseService.create(createMaladiiInfectioaseDto);
  }

  @Patch(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Update an MaladiiInfectioase.',
    summary: 'Update an MaladiiInfectioase',
  })
  @ApiOkResponse({
    description: 'TypeORM update result for MaladiiInfectioase',
  })
  async update(
    @Param('id') id: string,
    @Body() updateMaladiiInfectioaseDto: UpdateMaladiiInfectioaseDto,
  ): Promise<UpdateResult> {
    return this.MaladiiInfectioaseService.update(
      id,
      updateMaladiiInfectioaseDto,
    );
  }

  @Delete(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Delete an MaladiiInfectioase.',
    summary: 'Delete an MaladiiInfectioase',
  })
  @ApiOkResponse({
    description: 'TypeORM delete result for MaladiiInfectioase',
  })
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.MaladiiInfectioaseService.remove(id);
  }
}
