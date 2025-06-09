import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ControllerFactory } from 'src/common/controller/commonRest.controller';
import { CreateFrigiderDto } from './dto/create-frigider.dto';
import { UpdateFrigiderDto } from './dto/update-frigider.dto';
import { Frigider } from './entities/frigider.entity';
import { FrigiderService } from './frigider.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { RoleGuard } from 'src/auth/role.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/enums/roles.enum';

@ApiTags('frigider')
@Controller('frigider')
@UseGuards(AuthGuard('jwt'), RoleGuard)
@ApiBearerAuth()
export class FrigiderController extends ControllerFactory<
  Frigider,
  CreateFrigiderDto,
  UpdateFrigiderDto
>(CreateFrigiderDto, UpdateFrigiderDto) {
  constructor(protected readonly service: FrigiderService) {
    super();
  }

  @Get('/free')
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  async findFreeFrigidere() {
    const res = await this.service.findFreeFrigidere();
    return res;
  }

  @Get('/nr/:nr_frigider')
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  async findByNumber(@Param('nr_frigider') nr_frigider: number) {
    const res = await this.service.findByNumber(nr_frigider);
    return res;
  }
}
