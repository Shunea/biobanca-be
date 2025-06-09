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
import { CormService } from './corm.service';
import { CreateCormDto } from './dto/create-corm.dto';
import { UpdateCormDto } from './dto/update-corm.dto';
import { Corm } from './entities/corm.entity';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/enums/roles.enum';
import { REGEX_UUID_VALIDATION } from 'src/common/Regex';

@ApiTags('corm')
@Controller('corm')
@UseGuards(AuthGuard('jwt'), RoleGuard)
@ApiBearerAuth()
export class CormController {
  constructor(protected readonly cormService: CormService) {}

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get all corm.',
    summary: 'Get all corm',
  })
  @ApiOkResponse({ description: 'A list of corm' })
  async findAll(): Promise<Corm[]> {
    return await this.cormService.findAll();
  }

  @Get(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get corm by id.',
    summary: 'Get corm by id',
  })
  @ApiOkResponse({ description: 'A corm' })
  async findOne(@Param('id') id: string): Promise<Corm> {
    return this.cormService.findOne(id);
  }

  @Post()
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Create a new corm.',
    summary: 'Create a corm',
  })
  @ApiCreatedResponse({ description: 'A new corm' })
  async create(@Body() createCormDto: CreateCormDto): Promise<Corm> {
    return await this.cormService.create(createCormDto);
  }

  @Patch(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Update a corm.',
    summary: 'Update a corm',
  })
  @ApiOkResponse({ description: 'TypeORM update result for corm' })
  async update(
    @Param('id') id: string,
    @Body() updateCormDto: UpdateCormDto,
  ): Promise<UpdateResult> {
    return await this.cormService.update(id, updateCormDto);
  }

  @Delete(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Delete a corm.',
    summary: 'Delete a corm',
  })
  @ApiOkResponse({ description: 'TypeORM delete result for corm' })
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return await this.cormService.remove(id);
  }
}
