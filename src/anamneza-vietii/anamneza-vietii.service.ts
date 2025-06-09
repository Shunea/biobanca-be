import { Injectable } from '@nestjs/common';
import { CreateAnamnezaVietiiDto } from './dto/create-anamneza-vietii.dto';
import { UpdateAnamnezaVietiiDto } from './dto/update-anamneza-vietii.dto';
import { CommonCrudService } from 'src/common/service/commonService.service';
import { AnamnezaVietii } from './entities/anamneza-vietii.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AnamnezaVietiiService extends CommonCrudService<
AnamnezaVietii,
CreateAnamnezaVietiiDto,
UpdateAnamnezaVietiiDto> {
  constructor(
    @InjectRepository(AnamnezaVietii)
    protected readonly repository : Repository<AnamnezaVietii>,
  ){
  super(repository);
  }
}
