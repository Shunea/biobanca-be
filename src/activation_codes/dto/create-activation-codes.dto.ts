import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/entities/user.entity';

export class CreateActivationCodesDto {
  @ApiProperty()
  code: string;

  @ApiProperty()
  isUsed: boolean;

  @ApiProperty()
  expireDate: Date;

  @ApiProperty()
  user: User;
}
