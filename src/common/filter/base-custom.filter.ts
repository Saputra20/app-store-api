import { ArgumentsHost, ExceptionFilter, HttpStatus } from '@nestjs/common';

export class BaseCustomFilter implements ExceptionFilter {
  constructor(
    private message: string = 'Resource Already Existed',
    private statusCode: number = HttpStatus.BAD_REQUEST,
  ) {}
  catch(exception: any, host: ArgumentsHost) {
    const context = host.switchToHttp();
    const res = context.getResponse();
    res
      .status(this.statusCode)
      .json({ statusCode: this.statusCode, message: this.message });
  }
}
