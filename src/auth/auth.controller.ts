import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { RoleGuard } from 'src/auth/role.guard';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('/register')
  async registerUser(
    @Body() createUserDto: CreateUserDto,
    @Res() response: Response,
  ) {
    let user = await this.userService.findByUsername(createUserDto.username);

    if (user) {
      return response
        .status(HttpStatus.FOUND)
        .json({ err: true, message: 'Username is already registered' });
    }

    user = await this.authService.registerUser(createUserDto);

    delete user.password;

    const token = this.authService.loginUser(user).access_token;

    return response.status(HttpStatus.OK).json({
      user: user,
      access_token: token,
    });
  }

  @Post('/login')
  async loginUser(@Body() createUsersDto: any, @Res() response: Response) {
    const user = await this.authService.validate(
      createUsersDto.username,
      createUsersDto.password,
    );

    if (!user) {
      return response.status(HttpStatus.NOT_FOUND).json({
        err: true,
        message: 'Username sau parola sunt gresite!',
      });
    }

    if (!user.active) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        err: true,
        message: 'Utilizatorul nu este activ!',
      });
    }

    const token = this.authService.loginUser(user).access_token;
    
    return response.status(HttpStatus.OK).json({
      user: user,
      access_token: token,
    });
  }

  @Get('/user')
  @UseGuards(AuthGuard('jwt'), RoleGuard)
  @ApiBearerAuth()
  async getUser(@Res() response: Response, @Req() request: Request) {
    return response.status(HttpStatus.OK).json(request.user);
  }

  @Get('/logout')
  async logout(@Res() response: Response) {
    response.clearCookie('jwt', { httpOnly: true, sameSite: 'strict' });
    return response.status(HttpStatus.OK).json();
  }
}
