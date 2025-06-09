import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Req,
  Res,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
import { Role } from './enums/roles.enum';
import { Request, Response } from 'express';
import { generatePassword } from './user.utils';
import { UpdateUserPasswordDto } from './dto/update-password.dto';
import { ChangeUserPasswordDto } from './dto/change-password.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/auth/role.guard';
import { ActivationCodes } from 'src/activation_codes/entities/activation-codes.entity';
import { MailService } from 'src/providers/mail/mail.service';
import { ActivationCodesService } from 'src/activation_codes/activation-codes.service';
import { ApiBearerAuth, ApiOkResponse, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { validateEmail } from 'src/common/validateEmail';
import { Roles } from 'src/auth/roles.decorator';
import { REGEX_UUID_VALIDATION } from 'src/common/Regex';

@ApiTags('user')
@Controller('user')
@ApiBearerAuth()
export class UserController {
  constructor(
    protected readonly userService: UserService,
    private readonly activationCodesService: ActivationCodesService,
    private mailService: MailService,
  ) {}

  @Post('/admin/create-user')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA)
  async createUser(
    @Req() request: Request,
    @Res() response: Response,
    @Body() createUserDto: CreateUserDto,
  ) {
    if (request.user['rol'] === Role.OPERATOR_BIOBANCA && [Role.SUPER_ADMIN, Role.CERCETATOR_INDEPENDENT].includes(createUserDto.rol)) {
      throw new HttpException('Nu aveti dreptul sa creati utilizator cu acest rol!', HttpStatus.FORBIDDEN);
    }

    let user = await this.userService.findByUsername(createUserDto.username);

    if (user) {
      throw new HttpException('Utilizatorul exista deja!', HttpStatus.FOUND);
    }

    createUserDto.active = false;

    await validateEmail(createUserDto.username);

    const nameFromEmail = await this.getNameFromEmail(createUserDto.username);
    createUserDto.name = nameFromEmail.firstName;
    createUserDto.lastname = nameFromEmail.lastName;

    createUserDto.password = generatePassword();

    user = await this.userService.create(createUserDto);

    delete user.password;

    let activationCode: ActivationCodes = null;

    try {
      activationCode = await this.activationCodesService.createActivationCodes(
        user,
      );

      await this.mailService.accountActivation(
        user.username,
        activationCode.code,
        createUserDto.password,
      );
    } catch (error) {
      this.userService.remove(user.id);
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }

    return response.status(HttpStatus.OK).json({
      user,
    });
  }

  @Get(`/:id(${REGEX_UUID_VALIDATION})`)
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  @ApiOperation({
    description: 'Get user by id',
    summary: 'Get user by id',
  })
  @ApiOkResponse({ description: 'User by id' })
  getUserById(@Param('id') id: string): Promise<User> {
    return this.userService.getUserById(id);
  }

  @Get('/activate-account/:code')
  async activateAcount(
    @Param('code') code: string,
    @Res() response: Response,
  ): Promise<any> {
    const checkCode = await this.activationCodesService.checkCode(code);

    if (!checkCode.valid)
      return response.status(checkCode.errCode).json({
        message: checkCode.message,
      });

    try {
      const updateUserDto = new UpdateUserDto();
      updateUserDto.active = true;

      await this.userService.update(checkCode.findCode.user.id, updateUserDto);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }

    return response.status(HttpStatus.OK).json({
      message: 'Contul a fost activat cu succes',
    });
  }

  @Put('/update-account')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Role.SUPER_ADMIN, Role.OPERATOR_BIOBANCA, Role.OPERATOR, Role.CERCETATOR_INDEPENDENT)
  async updateAccount(
    @Res() response: Response,
    @Body() update: UpdateAccountDto,
  ): Promise<any> {
    if (update.password && update.oldPassword) {
      const check = await this.userService.checkPassword(update);

      if (!check) {
        throw new HttpException('Parola nu corespunde', HttpStatus.BAD_REQUEST);
      }

      try {
        await this.userService.updatePassword(update);
      } catch (error) {
        throw new HttpException(error, HttpStatus.BAD_REQUEST);
      }
    }

    try {
      await this.userService.update(update.id, {
        username: update.username,
        phone: update.phone,
        name: update.name,
        lastname: update.lastname,
        ...((update.password && update.oldPassword) && { password: update.password})
      });
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }

    return response.status(HttpStatus.OK).json({
      message: 'Contul a fost actualizat cu succes',
    });
  }

  @Put('/change-password/:code')
  async changePassword(
    @Param('code') code: string,
    @Res() response: Response,
    @Body() update: ChangeUserPasswordDto,
  ): Promise<any> {
    const checkCode = await this.activationCodesService.checkCode(code);

    if (!checkCode.valid)
      return response.status(checkCode.errCode).json({
        message: checkCode.message,
      });

    try {
      update.active = true;
      update.id = checkCode.findCode.user.id;
      await this.userService.updatePassword(update);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }

    return response.status(HttpStatus.OK).json({
      message: 'Parola a fost schimbata cu succes',
    });
  }

  @Put('/update-password')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  async updatePassword(
    @Req() request: Request,
    @Res() response: Response,
    @Body() update: UpdateUserPasswordDto,
  ): Promise<any> {
    update.id = request.user['id'];

    const check = await this.userService.checkPassword(update);

    if (!check) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Parola nu corespunde',
      });
    }

    try {
      await this.userService.updatePassword(update);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }

    return response.status(HttpStatus.OK).json({
      message: 'Parola a fost actualizata cu succes',
    });
  }

  @Get('/forgot-password')
  async resetPassword(
    @Res() response: Response,
    @Query('username') username: string,
  ): Promise<any> {
    const user = await this.userService.findByUsername(username);

    if (!user) {
      return response.status(HttpStatus.NOT_FOUND).json({
        message: 'Utilizatorul nu exista',
      });
    }
    let activationCode: ActivationCodes = null;

    try {
      activationCode = await this.activationCodesService.createActivationCodes(
        user,
      );
      await this.mailService.resetPassword(user.username, activationCode.code);
    } catch (error) {
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }

    return response.status(HttpStatus.OK).json({
      message: 'Un email a fost trimis cu instructiunile de resetare a parolei',
    });
  }

  @Delete('/username')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @Roles(Role.SUPER_ADMIN)
  @ApiOperation({
    description: 'Delete user by id',
    summary: 'Delete user by id',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'TypeORM delete result for user',
  })
  remove(@Body() body: any) {
    return this.userService.deleteByUsername(body);
  }

  private async getNameFromEmail(email: string) {
    if (email) {
      const match = email.match(/^([a-zA-Z0-9._-]+)@/);

      if (match) {
        const fullName = match[1];
        const nameParts = fullName.split(/[_.-]/);
        const firstName = nameParts[0].replace(/^\w/, (char) => char.toUpperCase());
        const lastName = nameParts[1] ? nameParts[1].replace(/^\w/, (char) => char.toUpperCase()) : "";

        return { firstName, lastName };
      }
    }
  }
}
