import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JWT_AUTH } from '../strategy';

@Injectable()
export class JwtAuthGuard extends AuthGuard(JWT_AUTH) {}
