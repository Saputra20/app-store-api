import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Observable, tap } from 'rxjs';
import { EVENT_KEY } from '../decorator';

@Injectable()
export class EmitsEventInterceptor implements NestInterceptor {
  constructor(
    private readonly reflector: Reflector,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> {
    const event = this.reflector.get(EVENT_KEY, context.getHandler());
    return next
      .handle()
      .pipe(tap((response) => this.eventEmitter.emit(event, response)));
  }
}
