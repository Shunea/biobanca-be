import * as md5 from 'md5';
import { ActivationCodes } from './entities/activation-codes.entity';
import { CreateActivationCodesDto } from './dto/create-activation-codes.dto';
import { FindManyOptions, Repository } from 'typeorm';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ActivationCodesService {
  constructor(
    @InjectRepository(ActivationCodes)
    private activationCodesRepository: Repository<ActivationCodes>,
  ) {}
  async createActivationCodes(user: User): Promise<ActivationCodes> {
    const code = md5(user.id + new Date().getTime().toString());

    const date = new Date();

    const expireDate = new Date(date.setHours(date.getHours() + 24));

    const createActivationCodesDto = new CreateActivationCodesDto();
    createActivationCodesDto.code = code;
    createActivationCodesDto.expireDate = expireDate;
    createActivationCodesDto.user = user;

    return await this.activationCodesRepository.save(createActivationCodesDto);
  }

  async findOne(
    options: FindManyOptions<ActivationCodes>,
  ): Promise<ActivationCodes> {
    return await this.activationCodesRepository.findOne(options);
  }

  async checkCode(code: string): Promise<any> {
    let valid = false;

    const findCode = await this.findOne({
      where: { code: code },
      relations: ['user'],
    });

    if (!findCode) {
      return {
        valid: valid,
        errCode: HttpStatus.NOT_FOUND,
        message: 'INVALID CODE',
      };
    }

    const date = new Date();

    if (date < new Date(findCode.expireDate) && !findCode.isUsed) {
      valid = true;
      findCode.isUsed = true;

      await this.activationCodesRepository.save(findCode);

      return {
        valid: true,

        findCode: findCode,
      };
    }

    return {
      valid: valid,
      errCode: HttpStatus.BAD_REQUEST,
      message: 'INVALID CODE',
    };
  }
}
