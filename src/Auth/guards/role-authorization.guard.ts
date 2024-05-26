import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ROLES } from '../auth.constants';

@Injectable()
export class RoleAuthorizationGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>(ROLES, context.getHandler());
    if (!roles) {
      return true;
    }
    const gqlContext = GqlExecutionContext.create(context);
    const { req } = gqlContext.getContext();
    const roleNames: string[] = req.user.roles.map(userRole => userRole.name);
    return roles.some(role => roleNames.includes(role));
  }
}
