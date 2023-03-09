import { UniqueConstraintViolationException } from '@mikro-orm/core';
import { Catch } from '@nestjs/common';
import { BaseCustomFilter } from './base-custom.filter';

@Catch(UniqueConstraintViolationException)
export class UniqueExceptionFilter extends BaseCustomFilter {}
