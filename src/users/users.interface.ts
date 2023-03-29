import { GetOption } from 'src/shares';
import { User } from './users.entity';

export enum EUserRole {
  OWNER = 'OWNER',
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
  USER = 'USER',
}

export type GetUserOptions = GetOption<User>;
