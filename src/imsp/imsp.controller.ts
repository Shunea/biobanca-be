import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ImspService } from './imsp.service';
import { CreateImspDto } from './dto/create-imsp.dto';
import { UpdateImspDto } from './dto/update-imsp.dto';
import { Imsp } from './entities/imsp.entity';
import { User } from 'src/user/entities/user.entity';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { DeleteResult, UpdateResult } from 'typeorm';
import { RoleGuard } from 'src/auth/role.guard';
import { AuthGuard } from '@nestjs/passport';
import { UserCtx } from 'src/common/user-context';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/enums/roles.enum';
import { REGEX_UUID_VALIDATION } from 'src/common/Regex';

@ApiTags('imsp')
@Controller('imsp')
@UseGuards(AuthGuard('jwt'), RoleGuard)
@ApiBearerAuth()
export class ImspController {
  constructor(protected readonly imspService: ImspService) {}

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get all IMSPs.',
    summary: 'Get all IMSPs',
  })
  @ApiOkResponse({ description: 'A list of IMSPs' })
  async findAll(): Promise<Imsp[]> {
    return this.imspService.findAll();
  }

  @Get(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get IMSP by id.',
    summary: 'Get IMSP by id',
  })
  @ApiOkResponse({ description: 'An IMSP' })
  async findOne(@Param('id') id: string): Promise<Imsp> {
    return this.imspService.findOne(id);
  }

  @Post()
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Create a new IMSP.',
    summary: 'Create an IMSP',
  })
  @ApiCreatedResponse({ description: 'A new IMSP' })
  async create(@Body() createImspDto: CreateImspDto): Promise<Imsp> {
    return this.imspService.create(createImspDto);
  }

  @Patch(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Update an IMSP.',
    summary: 'Update an IMSP',
  })
  @ApiOkResponse({ description: 'TypeORM update result for imsp' })
  async update(
    @Param('id') id: string,
    @Body() updateImspDto: UpdateImspDto,
  ): Promise<UpdateResult> {
    return this.imspService.update(id, updateImspDto);
  }

  @Delete(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Delete an IMSP.',
    summary: 'Delete an IMSP',
  })
  @ApiOkResponse({ description: 'TypeORM delete result for imsp' })
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.imspService.remove(id);
  }
}
