import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseFactory } from 'src/common/ResponseFactory';
import { UserCtx } from 'src/common/user-context';
import { RoleGuard } from 'src/auth/role.guard';
import { User } from 'src/user/entities/user.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { ProjectsService } from './projects.service';
import { Response } from 'express';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/enums/roles.enum';
import { REGEX_UUID_VALIDATION } from 'src/common/Regex';


@ApiTags('project')
@Controller('projects')
@UseGuards(AuthGuard('jwt'), RoleGuard)
@ApiBearerAuth()
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService,
    protected readonly responseFactory: ResponseFactory,
    ) {}
    
    @Get('/paginated')
    @UseGuards(AuthGuard('jwt'), RoleGuard)
    @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
    async getPaginated(
      @UserCtx() user: User,
      @Query()
      { limit, page, filter }: { limit: number; page: number; filter: any },
    ) {
      const res = await this.projectsService.getPaginated(limit, page, filter,user);
      
      return res;
    }
    @Post()
    @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA)
    @ApiOperation({
      description: 'Create new project',
      summary: 'Create new project',
    })
    @ApiResponse({ status: HttpStatus.CREATED, description: 'A new project' })
    async create(@Body() createProjectDto: CreateProjectDto) {
      return await this.projectsService.create(createProjectDto);
    }
    @Get()
    @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
    @ApiOperation({
      description: 'Get all projects',
      summary: 'Get all projects',
    })
    @ApiResponse({ status: HttpStatus.OK, description: 'A list of projects' })
    async findAll() {
      const res = await this.projectsService.findAll();
      return res;
    }
  

  @Get(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get project by id',
    summary: 'Get project by id',
  })
  @ApiResponse({ status: HttpStatus.OK, description: 'A project' })
  findOne(@Param('id') id: string) {
    return this.projectsService.findOne(id);
  }


  @Patch(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA)
  @ApiOperation({
    description: 'Update project by id',
    summary: 'Update project by id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'TypeORM update result for project',
  })
  async update(
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    return await this.projectsService.update(id, updateProjectDto);
  }

  @Delete(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA)
  @ApiOperation({
    description: 'Delete project by id',
    summary: 'Delete project by id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'TypeORM delete result for project',
  })
  async remove(@Param('id') id: string) {
    return await this.projectsService.remove(id);
  }
}
