import { ApiProperty } from '@nestjs/swagger/dist';
import { BaseEntity } from 'src/shares';
import { Column, Entity } from 'typeorm';
import { EUserRole } from './interface/users.interface';

@Entity('users')
export class User extends BaseEntity {
  @ApiProperty({ example: 'khang2038' })
  @Column()
  username: string;

  @ApiProperty({ example: 'khang@gmail.com' })
  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @ApiProperty({ example: 'Tran Van Khang' })
  @Column({ nullable: true, name: 'full_name' })
  fullname: string;

  @ApiProperty({ example: 'null' })
  @Column({ nullable: true })
  avatar: string;

  @ApiProperty({ example: '012345678' })
  @Column({ nullable: true })
  phone: string;

  @ApiProperty({ example: 'null' })
  @Column({ nullable: true })
  description: string;

  @ApiProperty({ example: EUserRole.USER })
  @Column({ enum: EUserRole, default: EUserRole.USER })
  role: EUserRole;
}
