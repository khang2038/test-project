import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExistsExeption } from 'src/exeptions';
import { Repository, FindOneOptions, Not } from 'typeorm';
import { CreateUserDto, UpdatePasswordUserDto, UpdateUserDto } from './dto';
import * as bcrypt from 'bcrypt';
import { SigninDto } from 'src/auth/dto/signin.dto';
import { User } from './users.entity';
import { GetUsersDto } from './dto/get-users.dto';
import { GetUserOptions } from './interface/users.interface';
import { getLimitAndOffset } from 'src/shares/get-limit-and-offset';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async getOneOrThrow(options: FindOneOptions<User>) {
    const user = await this.userRepository.findOne(options);
    if (!user) {
      throw new NotFoundException('user');
    }
    return user;
  }

  async getOne(options: FindOneOptions<User>) {
    const user = await this.userRepository.findOne(options);
    return user;
  }

  async CheckUserNameExits(username: string, userId?: string) {
    const user = !userId
      ? await this.getOne({ where: { username: username } })
      : await this.getOne({
          where: { username: username, id: userId && Not(userId) },
        });

    if (user) {
      throw new ExistsExeption('username is exists');
    }
  }

  async CheckEmailExits(email: string, userId?: string) {
    const user = !userId
      ? await this.getOne({ where: { email: email } })
      : await this.getOne({
          where: { email: email, id: userId && Not(userId) },
        });
    if (user) {
      throw new ExistsExeption('username is exists');
    }
  }

  comparePassword = async (dto: SigninDto) => {
    const user = await this.userRepository
      .createQueryBuilder('u')
      .where('username = :username', { username: dto.username })
      .orWhere('email = :email ', { email: dto.username })
      .addSelect('u.password')
      .getOne();

    if (!user) {
      throw new UnauthorizedException();
    }

    const isMatch = await bcrypt.compare(dto.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    return user;
  };

  async createUser(dto: CreateUserDto) {
    await this.CheckEmailExits(dto.email);
    await this.CheckUserNameExits(dto.username);
    const user = new User();
    Object.assign(user, dto);
    user.password = await bcrypt.hash(user.password, await bcrypt.genSalt());
    const saved = await this.userRepository.save(user);
    delete saved.password;
    return saved;
  }

  async updateProfileUser(dto: UpdateUserDto, user: User) {
    if (dto.email) {
      await this.CheckEmailExits(dto.email, user.id);
    }
    if (dto.username) {
      await this.CheckUserNameExits(dto.username, user.id);
    }
    Object.assign(user, dto);
    const saved = await this.userRepository.save(user);
    delete saved.password;
    return saved;
  }

  async updatePassword(dto: UpdatePasswordUserDto, user: User) {
    Object.assign(user, dto);
    const saved = await this.userRepository.save(user);
    delete saved.password;
    return saved;
  }

  async getUsers(dto?: GetUsersDto, option?: GetUserOptions) {
    const query = this.userRepository.createQueryBuilder('u');
    const { limit, offset } = getLimitAndOffset({
      limit: dto.limit,
      offset: dto.offset,
    });

    if (!option?.unlimited) {
      query.skip(offset).take(limit);
    }

    if (dto?.q) {
      query.andWhere(
        '(u.fullname ILIKE :q OR u.username ILIKE :q OR u.email ILIKE :q)',
        { q: `%${dto.q}%` }
      );
    }
    if (dto?.status) {
      query.andWhere('( u.status = :s)', { s: dto.status });
    }
    if (option?.id) {
      query.andWhere('(u.id = :id)', { id: option.id });
    }

    const [users, count] = await query.getManyAndCount();

    return {
      users,
      count,
    };
  }
}
