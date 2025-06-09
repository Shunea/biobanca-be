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
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Response } from 'express';
import { UserCtx } from 'src/common/user-context';
import { RoleGuard } from 'src/auth/role.guard';
import { User } from 'src/user/entities/user.entity';
import { DeleteResult, UpdateResult } from 'typeorm';
import { CreateSectiaDto } from './dto/create-sectia.dto';
import { UpdateSectiaDto } from './dto/update-sectia.dto';
import { Sectia } from './entities/sectia.entity';
import { SectiaService } from './sectia.service';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/enums/roles.enum';
import { REGEX_UUID_VALIDATION } from 'src/common/Regex';

@ApiTags('sectia')
@Controller('sectia')
@UseGuards(AuthGuard('jwt'), RoleGuard)
@ApiBearerAuth()
export class SectiaController {
  constructor(protected readonly sectiaService: SectiaService) {}

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get all sectii.',
    summary: 'Get all sectii',
  })
  @ApiOkResponse({ description: 'A list of sectii' })
  async findAll(@UserCtx() user: User) {
    return await this.sectiaService.findAll(user);
  }

  @Get(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get sectia by id.',
    summary: 'Get sectia by id',
  })
  @ApiOkResponse({ description: 'A sectia' })
  async findOne(@Param('id') id: string): Promise<Sectia> {
    return this.sectiaService.findOne(id);
  }

  @Post()
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Create a new sectia.',
    summary: 'Create a sectia',
  })
  @ApiCreatedResponse({ description: 'A new sectia' })
  async create(@Res() res: Response, @Body() createSectiaDto: CreateSectiaDto) {
    const sectia = await this.sectiaService.create(createSectiaDto);
    return res.status(HttpStatus.CREATED).json(sectia);
  }

  @Patch(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Update a sectia.',
    summary: 'Update a sectia',
  })
  @ApiOkResponse({ description: 'A sectia' })
  async update(
    @Param('id') id: string,
    @Body() updateSectiaDto: UpdateSectiaDto,
  ): Promise<UpdateResult> {
    return this.sectiaService.update(id, updateSectiaDto);
  }

  @Delete(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Delete a sectia.',
    summary: 'Delete a sectia',
  })
  @ApiOkResponse({ description: 'A sectia' })
  async remove(@Param('id') id: string): Promise<DeleteResult> {
    return this.sectiaService.remove(id);
  }
}
