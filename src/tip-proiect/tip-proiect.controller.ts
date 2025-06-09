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
import { TipProiectService } from './tip-proiect.service';
import { CreateTipProiectDto } from './dto/create-tip-proiect.dto';
import { TipProiect } from './entities/tip-proiect.entity';
import { UpdateTipProiectDto } from './dto/update-tip-proiect.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/enums/roles.enum';
import { REGEX_UUID_VALIDATION } from 'src/common/Regex';

@ApiTags('tip-proiect')
@Controller('tip-proiect')
@UseGuards(AuthGuard('jwt'), RoleGuard)
@ApiBearerAuth()
export class TipProiectController {
  constructor(private readonly TipProiectService: TipProiectService) {}
  @Get()
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get all TipProiects',
    summary: 'Get all TipProiects',
  })
  @ApiOkResponse({
    description: 'A list of TipProiects',
  })
  findAll(): Promise<TipProiect[]> {
    return this.TipProiectService.findAll();
  }

  @Get(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get TipProiect by id',
    summary: 'Get TipProiect by id',
  })
  @ApiOkResponse({
    description: 'A TipProiect',
  })
  findOne(@Param('id') id: string): Promise<TipProiect> {
    return this.TipProiectService.findOne(id);
  }
  @Post()
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Create a new tip-proiect.',
    summary: 'Create a tip-proiect',
  })
  @ApiCreatedResponse({ description: 'A new TipProiect' })
  async create(
    @Body() createTipProiectDto: CreateTipProiectDto,
  ): Promise<TipProiect> {
    return await this.TipProiectService.create(createTipProiectDto);
  }

  @Patch(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Update a TipProiect.',
    summary: 'Update a TipProiect',
  })
  @ApiOkResponse({ description: 'A TipProiect' })
  async update(
    @Param('id') id: string,
    @Body() updateTipProiectDto: UpdateTipProiectDto,
  ): Promise<UpdateResult> {
    return await this.TipProiectService.update(id, updateTipProiectDto);
  }

  @Delete(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Delete a TipProiect.',
    summary: 'Delete a TipProiect',
  })
  @ApiOkResponse({ description: 'A TipProiect' })
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return await this.TipProiectService.remove(id);
  }
}
