import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class PaginateResponseInterceptor implements NestInterceptor {
  constructor(
    private readonly statusCode: number,
    private readonly message: string,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const response = context.switchToHttp().getResponse();
    const req = context.switchToHttp().getRequest();
    const { page = 1, limit = 10 } = req.query;
    response.status(this.statusCode);
    return next.handle().pipe(
      map((data) => {
        const [rows, count] = data;
        return {
          statusCode: this.statusCode,
          message: this.message,
          data: {
            rows,
            metadata: {
              count,
              currentPage: Number(page),
              totalPage: Math.ceil(data[1] / Number(limit)),
            },
          },
        };
      }),
    );
  }
}
