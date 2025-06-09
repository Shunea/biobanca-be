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
import { CreateStareGeneralaPrelevareDto } from './dto/create-stare-generala-prelevare.dto';
import { UpdateStareGeneralaPrelevareDto } from './dto/update-stare-generala-prelevare.dto';
import { StareGeneralaPrelevare } from './entities/stare-generala-prelevare.entity';
import { StareGeneralaPrelevareService } from './stare-generala-prelevare.service';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/enums/roles.enum';
import { REGEX_UUID_VALIDATION } from 'src/common/Regex';

@ApiTags('stare-generala-prelevare')
@Controller('stare-generala-prelevare')
@UseGuards(AuthGuard('jwt'), RoleGuard)
@ApiBearerAuth()
export class StareGeneralaPrelevareController {
  constructor(protected readonly StareGeneralaPrelevareService: StareGeneralaPrelevareService) {}

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get all StareGeneralaPrelevares',
    summary: 'Get all StareGeneralaPrelevares',
  })
  @ApiOkResponse({
    description: 'A list of StareGeneralaPrelevares',
  })
  findAll(): Promise<StareGeneralaPrelevare[]> {
    return this.StareGeneralaPrelevareService.findAll();
  }

  @Get(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get StareGeneralaPrelevare by id',
    summary: 'Get StareGeneralaPrelevare by id',
  })
  @ApiOkResponse({
    description: 'A StareGeneralaPrelevare',
  })
  findOne(@Param('id') id: string): Promise<StareGeneralaPrelevare> {
    return this.StareGeneralaPrelevareService.findOne(id);
  }

  @Post()
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Create new StareGeneralaPrelevare',
    summary: 'Create new StareGeneralaPrelevare',
  })
  @ApiCreatedResponse({
    description: 'A new StareGeneralaPrelevare',
  })
  create(@Body() createStareGeneralaPrelevareDto: CreateStareGeneralaPrelevareDto): Promise<StareGeneralaPrelevare> {
    return this.StareGeneralaPrelevareService.create(createStareGeneralaPrelevareDto);
  }

  @Patch(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Update StareGeneralaPrelevare by id',
    summary: 'Update StareGeneralaPrelevare by id',
  })
  @ApiOkResponse({
    description: 'TypeORM update result for StareGeneralaPrelevare',
  })
  update(
    @Param('id') id: string,
    @Body() updateStareGeneralaPrelevareDto: UpdateStareGeneralaPrelevareDto,
  ): Promise<UpdateResult> {
    return this.StareGeneralaPrelevareService.update(id, updateStareGeneralaPrelevareDto);
  }

  @Delete(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Delete StareGeneralaPrelevare by id',
    summary: 'Delete StareGeneralaPrelevare by id',
  })
  @ApiOkResponse({
    description: 'TypeORM delete result for StareGeneralaPrelevare',
  })
  remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.StareGeneralaPrelevareService.remove(id);
  }
}