import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { AccountType } from '../../common/enum';
import { RoleGuard } from '../guard';

export const ROLE_KEY = 'role';

export const Roles = (...roles: AccountType[]) =>
  applyDecorators(
    ApiBearerAuth(),
    SetMetadata(ROLE_KEY, roles),
    UseGuards(JwtAuthGuard, RoleGuard),
  );
