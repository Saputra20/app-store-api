import { NotFoundError } from '@mikro-orm/core';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';

@Catch(NotFoundError)
export class NotFoundExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const res = context.getResponse();
    console.log(exception.message);
    res
      .status(HttpStatus.NOT_FOUND)
      .json({ statusCode: HttpStatus.NOT_FOUND, message: exception.message });
  }
}
