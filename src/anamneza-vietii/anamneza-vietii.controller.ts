import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AnamnezaVietiiService } from './anamneza-vietii.service';
import { CreateAnamnezaVietiiDto } from './dto/create-anamneza-vietii.dto';
import { UpdateAnamnezaVietiiDto } from './dto/update-anamneza-vietii.dto';
import { ControllerFactory } from 'src/common/controller/commonRest.controller';
import { AnamnezaVietii } from './entities/anamneza-vietii.entity';

@Controller('anamneza-vietii')
export class AnamnezaVietiiController extends ControllerFactory<
AnamnezaVietii,
CreateAnamnezaVietiiDto,
UpdateAnamnezaVietiiDto
>(CreateAnamnezaVietiiDto,UpdateAnamnezaVietiiDto) {
  constructor(protected readonly anamnezaVietiiService: AnamnezaVietiiService) {
    super();
  }
}
