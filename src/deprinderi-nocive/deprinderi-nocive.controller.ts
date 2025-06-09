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
import { CreateDeprinderiNociveDto } from './dto/create-deprinderi-nocive.dto';
import { UpdateDeprinderiNociveDto } from './dto/update-deprinderi-nocive.dto';
import { DeprinderiNocive } from './entities/deprinderi-nocive.entity';
import { DeprinderiNociveService } from './deprinderi-nocive.service';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/enums/roles.enum';
import { REGEX_UUID_VALIDATION } from 'src/common/Regex';

@ApiTags('deprinderi-nocive')
@Controller('deprinderi-nocive')
@UseGuards(AuthGuard('jwt'), RoleGuard)
@ApiBearerAuth()
export class DeprinderiNociveController {
  constructor(protected readonly DeprinderiNociveService: DeprinderiNociveService) {}

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get all DeprinderiNocives',
    summary: 'Get all DeprinderiNocives',
  })
  @ApiOkResponse({
    description: 'A list of DeprinderiNocives',
  })
  findAll(): Promise<DeprinderiNocive[]> {
    return this.DeprinderiNociveService.findAll();
  }

  @Get(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get DeprinderiNocive by id',
    summary: 'Get DeprinderiNocive by id',
  })
  @ApiOkResponse({
    description: 'A DeprinderiNocive',
  })
  findOne(@Param('id') id: string): Promise<DeprinderiNocive> {
    return this.DeprinderiNociveService.findOne(id);
  }

  @Post()
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Create new DeprinderiNocive',
    summary: 'Create new DeprinderiNocive',
  })
  @ApiCreatedResponse({
    description: 'A new DeprinderiNocive',
  })
  create(@Body() createDeprinderiNociveDto: CreateDeprinderiNociveDto): Promise<DeprinderiNocive> {
    return this.DeprinderiNociveService.create(createDeprinderiNociveDto);
  }

  @Patch(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Update DeprinderiNocive by id',
    summary: 'Update DeprinderiNocive by id',
  })
  @ApiOkResponse({
    description: 'TypeORM update result for DeprinderiNocive',
  })
  update(
    @Param('id') id: string,
    @Body() updateDeprinderiNociveDto: UpdateDeprinderiNociveDto,
  ): Promise<UpdateResult> {
    return this.DeprinderiNociveService.update(id, updateDeprinderiNociveDto);
  }

  @Delete(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Delete DeprinderiNocive by id',
    summary: 'Delete DeprinderiNocive by id',
  })
  @ApiOkResponse({
    description: 'TypeORM delete result for DeprinderiNocive',
  })
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.DeprinderiNociveService.remove(id);
  }
}