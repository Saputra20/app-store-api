import { applyDecorators, SetMetadata, UseInterceptors } from '@nestjs/common';
import { EmitsEventInterceptor } from '../interceptor';

export const EVENT_KEY = 'EVENT_KEY';
export const EmitsEvent = (event: string) =>
  applyDecorators(
    SetMetadata(EVENT_KEY, event),
    UseInterceptors(EmitsEventInterceptor),
  );
