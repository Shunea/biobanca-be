import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivationCodesModule } from 'src/activation_codes/activation-codes.module';
import { MailService } from 'src/providers/mail/mail.service';
import { User } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User]), ActivationCodesModule],
  exports: [UserService],
  controllers: [UserController],
  providers: [UserService, MailService],
})
export class UserModule {}
