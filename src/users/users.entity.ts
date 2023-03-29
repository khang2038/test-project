import { BaseEntity } from 'src/shares';
import { Column, Entity } from 'typeorm';
import { EUserRole } from './users.interface';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  username: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ nullable: true, name: 'full_name' })
  fullname: string;

  @Column({ nullable: true })
  avatar: string;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  description: string;

  @Column({ enum: EUserRole, default: EUserRole.USER })
  role: EUserRole;
}
