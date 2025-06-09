import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ControllerFactory } from 'src/common/controller/commonRest.controller';
import { CutieService } from './cutie.service';
import { CreateCutieDto } from './dto/create-cutie.dto';
import { UpdateCutieDto } from './dto/update-cutie.dto';
import { Cutie } from './entities/cutie.entity';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/enums/roles.enum';

@ApiTags('cutie')
@Controller('cutie')
@UseGuards(AuthGuard('jwt'), RoleGuard)
@ApiBearerAuth()
export class CutieController extends ControllerFactory<
  Cutie,
  CreateCutieDto,
  UpdateCutieDto
>(CreateCutieDto, UpdateCutieDto) {
  constructor(protected readonly service: CutieService) {
    super();
  }

  @Get('/nr/:nr_cutie')
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  async findByNumber(@Param('nr_cutie') nr_cutie: string) {
    const res = await this.service.findByNumber(nr_cutie);
    return res;
  }

  @Get('/with-celule/:id')
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  async findWithCelule(@Param('id') id: string) {
    const res = await this.service.findWithCelule(id);
    return res;
  }

  @Get('/free')
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  async findFreeCutii() {
    const res = await this.service.findFreeCutii();
    return res;
  }
}
