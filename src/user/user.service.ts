import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { compare, hash } from 'bcrypt';
import { plainToClass } from 'class-transformer';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ChangeUserPasswordDto } from './dto/change-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserPasswordDto } from './dto/update-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { validateEmail } from 'src/common/validateEmail';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    readonly repo: Repository<User>,
  ) {}

  async getUserById(id: string): Promise<User> {
    const user = await this.repo.findOne({
      where: { id },
      relations: ['imsp'],
    });

    return user;
  }

  async findByUsername(username: string): Promise<User> {
    const user = await this.repo.findOne({
      where: {
        username: username,
      },
      relations: ['imsp'],
    });

    return user;
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = plainToClass(User, createUserDto);

    return await this.repo.save(user).then((res) => {
      return res;
    });
  }

  async update(
    id: string | string,
    updateUserDto: UpdateUserDto,
  ): Promise<UpdateResult> {
    return await this.repo.update(id, updateUserDto);
  }

  async remove(id: string | string): Promise<DeleteResult> {
    return await this.repo.delete(id);
  }

  async updatePassword(
    dto: UpdateUserPasswordDto | ChangeUserPasswordDto,
  ): Promise<any> {
    dto.password = await hash(dto.password, 10);

    return await this.repo
      .update(dto.id, { password: dto.password, active: dto.active })
      .then((res) => {
        return res;
      });
  }

  async checkPassword(dto: UpdateUserPasswordDto): Promise<any> {
    const user = await this.repo.findOneBy({ id: dto.id });

    if (!user) throw { err: true };

    return await compare(dto.oldPassword, user.password);
  }

  async deleteByUsername(body: any) {
    const { username } = body;

    await validateEmail(username);

    const user = await this.repo.findOne({ where: { username }});

    if (!user) {
      throw new HttpException('Nu exista asa utilizator!', HttpStatus.NOT_FOUND);
    }

    return await this.repo.delete({ username });
  }
}
