import { Module } from '@nestjs/common';
import { ResponseFactory } from './ResponseFactory';

@Module({
  imports: [],
  providers: [ResponseFactory],
  exports: [ResponseFactory],
})
export class SharedModule {}
