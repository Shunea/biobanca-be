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
import { TransferatLaService } from './transferat-la.service';
import { CreateTransferatLaDto } from './dto/create-transferat-la.dto';
import { TransferatLa } from './entity/transferat-la.entity';
import { UpdateTransferatLaDto } from './dto/update-transferat-la.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/enums/roles.enum';
import { REGEX_UUID_VALIDATION } from 'src/common/Regex';

@ApiTags('transferat-la')
@Controller('transferat-la')
@UseGuards(AuthGuard('jwt'), RoleGuard)
@ApiBearerAuth()
export class TransferatLaController {
  constructor(private readonly TransferatLaService: TransferatLaService) {}
  @Get()
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get all TransferatLas',
    summary: 'Get all TransferatLas',
  })
  @ApiOkResponse({
    description: 'A list of TransferatLas',
  })
  findAll(): Promise<TransferatLa[]> {
    return this.TransferatLaService.findAll();
  }

  @Get(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get TransferatLa by id',
    summary: 'Get TransferatLa by id',
  })
  @ApiOkResponse({
    description: 'A TransferatLa',
  })
  findOne(@Param('id') id: string): Promise<TransferatLa> {
    return this.TransferatLaService.findOne(id);
  }
  @Post()
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Create a new transferat-la.',
    summary: 'Create a transferat-la',
  })
  @ApiCreatedResponse({ description: 'A new TransferatLa' })
  async create(
    @Body() createTransferatLaDto: CreateTransferatLaDto,
  ): Promise<TransferatLa> {
    return await this.TransferatLaService.create(createTransferatLaDto);
  }

  @Patch(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Update a TransferatLa.',
    summary: 'Update a TransferatLa',
  })
  @ApiOkResponse({ description: 'A TransferatLa' })
  async update(
    @Param('id') id: string,
    @Body() updateTransferatLaDto: UpdateTransferatLaDto,
  ): Promise<UpdateResult> {
    return await this.TransferatLaService.update(id, updateTransferatLaDto);
  }

  @Delete(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Delete a TransferatLa.',
    summary: 'Delete a TransferatLa',
  })
  @ApiOkResponse({ description: 'A TransferatLa' })
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return await this.TransferatLaService.remove(id);
  }
}
