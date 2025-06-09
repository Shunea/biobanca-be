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
import { CIMXService } from './cimx.service';
import { CreateCIMXDto } from './dto/create-cimx.dto';
import { UpdateCIMXDto } from './dto/update-cimx.dto';
import { CIMX } from './entities/cimx.entity';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/enums/roles.enum';
import { REGEX_UUID_VALIDATION } from 'src/common/Regex';

@ApiTags('cimx')
@Controller('cimx')
@UseGuards(AuthGuard('jwt'), RoleGuard)
@ApiBearerAuth()
export class CIMXController {
  constructor(protected readonly cimxService: CIMXService) {}

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get all cimx',
    summary: 'Get all cimx',
  })
  @ApiOkResponse({
    description: 'A list of cimx',
  })
  findAll(): Promise<CIMX[]> {
    return this.cimxService.findAll();
  }

  @Get(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get cimx by id',
    summary: 'Get cimx by id',
  })
  @ApiOkResponse({
    description: 'A cimx',
  })
  findOne(@Param('id') id: string): Promise<CIMX> {
    return this.cimxService.findOne(id);
  }

  @Post()
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Create new cimx',
    summary: 'Create new cimx',
  })
  @ApiCreatedResponse({
    description: 'A new cimx',
  })
  create(@Body() createCIMXDto: CreateCIMXDto): Promise<CIMX> {
    return this.cimxService.create(createCIMXDto);
  }

  @Patch(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Update cimx by id',
    summary: 'Update cimx by id',
  })
  @ApiOkResponse({
    description: 'TypeORM update result for cimx',
  })
  update(
    @Param('id') id: string,
    @Body() updateCIMXDto: UpdateCIMXDto,
  ): Promise<UpdateResult> {
    return this.cimxService.update(id, updateCIMXDto);
  }

  @Delete(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Delete cimx by id',
    summary: 'Delete cimx by id',
  })
  @ApiOkResponse({
    description: 'TypeORM delete result for cimx',
  })
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.cimxService.remove(id);
  }
}
