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

    res
      .status(HttpStatus.NOT_FOUND)
      .json({ statusCode: HttpStatus.NOT_FOUND, message: 'Not Found' });
  }
}
