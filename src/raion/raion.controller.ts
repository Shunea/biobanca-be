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
import { CreateRaionDto } from './dto/create-raion.dto';
import { UpdateRaionDto } from './dto/update-raion.dto';
import { Raion } from './entities/raion.entity';
import { RaionService } from './raion.service';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/enums/roles.enum';
import { REGEX_UUID_VALIDATION } from 'src/common/Regex';

@ApiTags('raion')
@Controller('raion')
@UseGuards(AuthGuard('jwt'), RoleGuard)
@ApiBearerAuth()
export class RaionController {
  constructor(protected readonly raionService: RaionService) {}

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get all raions',
    summary: 'Get all raions',
  })
  @ApiOkResponse({
    description: 'A list of raions',
  })
  findAll(): Promise<Raion[]> {
    return this.raionService.findAll();
  }

  @Get(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get raion by id',
    summary: 'Get raion by id',
  })
  @ApiOkResponse({
    description: 'A raion',
  })
  findOne(@Param('id') id: string): Promise<Raion> {
    return this.raionService.findOne(id);
  }

  @Post()
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Create new raion',
    summary: 'Create new raion',
  })
  @ApiCreatedResponse({
    description: 'A new raion',
  })
  create(@Body() createRaionDto: CreateRaionDto): Promise<Raion> {
    return this.raionService.create(createRaionDto);
  }

  @Patch(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Update raion by id',
    summary: 'Update raion by id',
  })
  @ApiOkResponse({
    description: 'TypeORM update result for raion',
  })
  update(
    @Param('id') id: string,
    @Body() updateRaionDto: UpdateRaionDto,
  ): Promise<UpdateResult> {
    return this.raionService.update(id, updateRaionDto);
  }

  @Delete(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Delete raion by id',
    summary: 'Delete raion by id',
  })
  @ApiOkResponse({
    description: 'TypeORM delete result for raion',
  })
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.raionService.remove(id);
  }
}