import { HttpStatus } from '@nestjs/common';
import { Response } from 'express';

export class ResFactory {
  public static success(
    response: Response,
    data: any,
    httpStatus: HttpStatus,
  ): Response {
    return response.status(httpStatus).json(data);
  }

  public static error(
    response: Response,
    errCode: HttpStatus,
    message: string,
  ): Response {
    return response.status(errCode).json({
      err: true,
      errCode: errCode,
      message: message,
    });
  }
}
