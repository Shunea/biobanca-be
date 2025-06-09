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
import { CreateProbaAlicotataDto } from './dto/create-proba-alicotata.dto';
import { ProbaAlicotataService } from './proba-alicotata.service';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/role.guard';
import { UserCtx } from 'src/common/user-context';
import { User } from 'src/user/entities/user.entity';
import { UpdateProbaAlicotataDto } from './dto/update-proba-alicotata.dto';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/enums/roles.enum';
import { REGEX_UUID_VALIDATION } from 'src/common/Regex';

@ApiTags('proba-alicotata')
@Controller('proba-alicotata')
@UseGuards(AuthGuard('jwt'), RoleGuard)
@ApiBearerAuth()
export class ProbaAlicotataController {
  constructor(private readonly probaAlicotataService: ProbaAlicotataService) {}

  @ApiOperation({
    summary: 'A list of proba-alicotata',
    description: 'A list of proba-alicotata',
  })
  @ApiOkResponse({
    description: 'A list of proba-alicotata',
  })
  @Get()
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  findAll() {
    return this.probaAlicotataService.findAll();
  }

  @ApiOperation({
    summary: 'Create a new proba-alicotata',
    description: 'Create a new proba-alicotata',
  })
  @ApiOkResponse({
    description: 'The proba-alicotata has been successfully created.',
  })
  @Get(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  findOne(@Param('id') id: string) {
    return this.probaAlicotataService.findOne(id);
  }

  @ApiOperation({
    summary: 'Create a new proba-alicotata',
    description: 'Create a new proba-alicotata',
  })
  @ApiCreatedResponse({
    description: 'The proba-alicotata has been successfully created.',
  })
  @Post()
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  create(@Body() createProbaAlicotataDto: CreateProbaAlicotataDto) {
    return this.probaAlicotataService.create(createProbaAlicotataDto);
  }

  @ApiOperation({
    summary: 'Update a proba-alicotata',
    description: 'Update a proba-alicotata',
  })
  @ApiOkResponse({
    description: 'The proba-alicotata has been successfully updated.',
  })
  @Patch(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  update(
    @UserCtx() user: User,
    @Param('id') id: string,
    @Body() updateProbaAlicotataDto: UpdateProbaAlicotataDto,
  ) {
    return this.probaAlicotataService.update(id, updateProbaAlicotataDto, user);
  }

  @ApiOperation({
    summary: 'Delete a proba-alicotata',
    description: 'Delete a proba-alicotata',
  })
  @ApiOkResponse({
    description: 'The proba-alicotata has been successfully deleted.',
  })
  @Delete(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  remove(@Param('id') id: string) {
    return this.probaAlicotataService.remove(id);
  }
}
