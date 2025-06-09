import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class ResponseFactory {
  private serverTime: Date;

  constructor() {
    const now = new Date();
    this.serverTime = new Date(
      now.getUTCFullYear(),
      now.getUTCMonth(),
      now.getUTCDate(),
      now.getUTCHours(),
      now.getUTCMinutes(),
      now.getUTCSeconds(),
    );
  }

  answer(status: HttpStatus, data: any = {}, response, message?) {
    this.answerTemplate(data, response, status, message);
  }

  answerError(status: HttpStatus, data: any = {}, response, message?) {
    this.answerTemplate(data, response, status, message);
  }

  answerTemplate(
    data: any = {},
    response: any,
    httpStatusCode: HttpStatus,
    message = '',
  ) {
    const res = Object.keys(HttpStatus).find(
      (key) => HttpStatus[key] == httpStatusCode,
    );

    const responseObject = {
      meta: {
        serverTime: this.serverTime,
        HttpStatusCode: httpStatusCode,
        HttpStatusMessage: res,
        message: message,
      },
      data,
    };
    response.status(httpStatusCode).json(responseObject);
  }

  notFound(errors: any = {}, response: any, message = '') {
    this.answerTemplate(errors, response, HttpStatus.NOT_FOUND, message);
  }

  error(errors: any = {}, response: any, message = '') {
    this.answerTemplate(
      errors,
      response,
      HttpStatus.INTERNAL_SERVER_ERROR,
      message,
    );
  }
}
