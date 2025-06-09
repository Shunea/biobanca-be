import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
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
import { DeleteResult } from 'typeorm';
import { Barcode } from './entities/barcode.entity';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/role.guard';
import { BarcodeService } from './barcode.service';
import { CreateBarcodeDto } from './dto/create-barcode.dto';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/user/enums/roles.enum';
import { REGEX_UUID_VALIDATION } from 'src/common/Regex';

@ApiTags('barcode')
@Controller('barcode')
@UseGuards(AuthGuard('jwt'), RoleGuard)
@ApiBearerAuth()
export class BarcodeController {
  constructor(
    protected readonly barcodeService: BarcodeService
  ) {}

  @Post()
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Create a new barcode',
    summary: 'Create a new barcode',
  })
  @ApiCreatedResponse({ description: 'Barcode was created' })
  async create(@Body() createBarcodeDto: CreateBarcodeDto): Promise<Barcode[]> {
    return await this.barcodeService.create(createBarcodeDto);
  }

  @Get()
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get all barcodes',
    summary: 'Get all barcodes',
  })
  @ApiOkResponse({ description: 'A list of barcodes' })
  async findAll(): Promise<Barcode[]> {
    return await this.barcodeService.findAll();
  }

  @Get(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get barcode by id.',
    summary: 'Get barcode by id',
  })
  @ApiOkResponse({ description: 'Barcode by id' })
  async findOneById(@Param('id') id: string): Promise<Barcode> {
    return await this.barcodeService.findOneById(id);
  }
  
  @Get('/proba/:id')
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get barcodes by proba id.',
    summary: 'Get barcodes by proba id',
  })
  @ApiOkResponse({ description: 'Barcodes by proba id' })
  async findByProbaId(@Param('id') id: string): Promise<Barcode[]> {
    return await this.barcodeService.findByProbaId(id);
  }

  @Delete(`/:id(${REGEX_UUID_VALIDATION})`)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Delete barcode by id',
    summary: 'Delete barcode by id',
  })
  @ApiOkResponse({ description: 'Bracode was deleted' })
  async deleteById(@Param('id') id: string): Promise<DeleteResult> {
    return await this.barcodeService.deleteById(id);
  }
}
