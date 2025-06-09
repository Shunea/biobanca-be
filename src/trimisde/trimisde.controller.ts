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
import { CreateTrimisDeDto } from './dto/create-trimisde.dto';
import { UpdateTrimisDeDto } from './dto/update-trimisde.dto';
import { TrimisDe } from './entities/trimisde.entity';
import { TrimisDeService } from './trimisde.service';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/enums/roles.enum';
import { REGEX_UUID_VALIDATION } from 'src/common/Regex';

@ApiTags('trimisde')
@Controller('trimisde')
@UseGuards(AuthGuard('jwt'), RoleGuard)
@ApiBearerAuth()
export class TrimisDeController {
  constructor(protected readonly trimisdeService: TrimisDeService) {}

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get all trimisde.',
    summary: 'Get all trimisde',
  })
  @ApiOkResponse({ description: 'A list of trimisde' })
  findAll(): Promise<TrimisDe[]> {
    return this.trimisdeService.findAll();
  }

  @Get(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get trimisde by id.',
    summary: 'Get trimisde by id',
  })
  @ApiOkResponse({ description: 'A trimisde' })
  findOne(@Param('id') id: string): Promise<TrimisDe> {
    return this.trimisdeService.findOne(id);
  }

  @Post()
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Create a new trimisde.',
    summary: 'Create a trimisde',
  })
  @ApiCreatedResponse({ description: 'A new trimisde' })
  create(@Body() createTrimisDeDto: CreateTrimisDeDto): Promise<TrimisDe> {
    return this.trimisdeService.create(createTrimisDeDto);
  }

  @Patch(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Update a trimisde.',
    summary: 'Update a trimisde',
  })
  @ApiOkResponse({ description: 'TypeORM update result for trimisDe' })
  update(
    @Param('id') id: string,
    @Body() updateTrimisDeDto: UpdateTrimisDeDto,
  ): Promise<UpdateResult> {
    return this.trimisdeService.update(id, updateTrimisDeDto);
  }

  @Delete(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Delete a trimisde.',
    summary: 'Delete a trimisde',
  })
  @ApiOkResponse({ description: 'TypeORM delete result for trimisDe' })
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.trimisdeService.remove(id);
  }
}
