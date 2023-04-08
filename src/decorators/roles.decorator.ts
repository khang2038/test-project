import { SetMetadata } from '@nestjs/common';
import { EUserRole } from 'src/users/interface/users.interface';

export const Roles = (...roles: EUserRole[]) => SetMetadata('roles', roles);
