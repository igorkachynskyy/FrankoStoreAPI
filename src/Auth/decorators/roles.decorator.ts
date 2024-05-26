import { SetMetadata } from '@nestjs/common';
import { RoleEnum } from '../../User/enums/role.enum';
import { ROLES } from '../auth.constants';

export const Roles = (...roles: RoleEnum[]) => SetMetadata(ROLES, roles);
