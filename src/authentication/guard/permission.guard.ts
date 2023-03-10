import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Account } from '../../feature/account/entities/account.entity';
import { PermissionEnum } from '../../common/enum';
import { PERMISSION_KEY } from '../../authentication/decorator';

@Injectable()
export class PermissionGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredPermissions = this.reflector.getAllAndOverride<any[]>(
      PERMISSION_KEY,
      [context.getHandler(), context.getClass()],
    );
    const user = context.switchToHttp().getRequest().user as Account;
    return (
      user.admin.role.permissions.includes(PermissionEnum.ALL) ||
      requiredPermissions.some((p) => user.admin.role.permissions.includes(p))
    );
  }
}
