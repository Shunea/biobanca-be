import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}
  async validate(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);

    if (user) {
      const match = await compare(password, user.password);

      if (match) {
        return {
          id: user.id,
          username: user.username,
          rol: user.rol,
          active: user.active,
          name: user.name,
          lastname: user.lastname,
          imsp: user.imsp,
          phone: user.phone,
        };
      }
    }

    return null;
  }

  loginUser(user: User) {
    const payload = {
      id: user.id,
      username: user.username,
      rol: user.rol,
      active: user.active,
      name: user.name,
      lastname: user.lastname,
      imsp: user.imsp,
      phone: user.phone,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async registerUser(user: CreateUserDto): Promise<User> {
    return await this.userService.create(user);
  }
}
