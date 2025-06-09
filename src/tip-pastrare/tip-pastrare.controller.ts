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
import { TipPastrareService } from './tip-pastrare.service';
import { CreateTipPastrareDto } from './dto/create-tip-pastrare.dto';
import { UpdateTipPastrareDto } from './dto/update-tip-pastrare.dto';
import { TipPastrare } from './entities/tip-pastrare.entity';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/enums/roles.enum';
import { REGEX_UUID_VALIDATION } from 'src/common/Regex';

@ApiTags('tip-pastrare')
@Controller('tip-pastrare')
@UseGuards(AuthGuard('jwt'), RoleGuard)
@ApiBearerAuth()
export class TipPastrareController {
  constructor(protected readonly TipPastrareService: TipPastrareService) {}

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get all TipPastrare.',
    summary: 'Get all TipPastrare',
  })
  @ApiOkResponse({ description: 'A list of TipPastrare' })
  async findAll(): Promise<TipPastrare[]> {
    return this.TipPastrareService.findAll();
  }

  @Get(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get TipPastrare by id.',
    summary: 'Get TipPastrare by id',
  })
  @ApiOkResponse({ description: 'A TipPastrare' })
  async findOne(@Param('id') id: string): Promise<TipPastrare> {
    return this.TipPastrareService.findOne(id);
  }

  @Post()
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Create a new TipPastrare.',
    summary: 'Create an TipPastrare',
  })
  @ApiCreatedResponse({ description: 'A new TipPastrare' })
  async create(@Body() createTipPastrareDto: CreateTipPastrareDto): Promise<TipPastrare> {
    return this.TipPastrareService.create(createTipPastrareDto);
  }

  @Patch(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Update an TipPastrare.',
    summary: 'Update an TipPastrare',
  })
  @ApiOkResponse({ description: 'TypeORM update result for TipPastrare' })
  async update(
    @Param('id') id: string,
    @Body() updateTipPastrareDto: UpdateTipPastrareDto,
  ): Promise<UpdateResult> {
    return this.TipPastrareService.update(id, updateTipPastrareDto);
  }

  @Delete(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Delete an TipPastrare.',
    summary: 'Delete an TipPastrare',
  })
  @ApiOkResponse({ description: 'TypeORM delete result for TipPastrare' })
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.TipPastrareService.remove(id);
  }
}
