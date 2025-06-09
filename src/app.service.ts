import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello! Biobanca project will be placed here! (Check autodeploy)';
  }
}
