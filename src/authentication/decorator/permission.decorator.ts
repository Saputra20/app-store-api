import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guard/jwt-auth.guard';
import { PermissionGuard } from '../guard/permission.guard';

export const PERMISSION_KEY = 'permission';

export const Permissions = (...permissions: any[]) =>
  applyDecorators(
    ApiBearerAuth(),
    SetMetadata(PERMISSION_KEY, permissions),
    UseGuards(JwtAuthGuard, PermissionGuard),
  );
