import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ExistsExeption } from 'src/exeptions';
import { Repository, FindOneOptions } from 'typeorm';
import { CreateUserDto } from './dto';
import * as bcrypt from 'bcrypt';
import { SigninDto } from 'src/auth/dto/signin.dto';
import { User } from './users.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
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

  async CheckUserNameExits(username: string) {
    const user = await this.getOne({ where: { username: username } });
    if (user) {
      return true;
    }
    return false;
  }

  async CheckEmailExits(email: string) {
    const user = await this.getOne({ where: { email: email } });
    if (user) {
      return true;
    }
    return false;
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
    const CheckEmailExits = await this.CheckEmailExits(dto.email);
    const CheckUserNameExits = await this.CheckUserNameExits(dto.username);
    if ([CheckEmailExits, CheckUserNameExits].includes(true)) {
      throw new ExistsExeption('email or username');
    }
    const user = new User();
    Object.assign(user, dto);
    user.password = await bcrypt.hash(user.password, await bcrypt.genSalt());
    const saved = await this.userRepository.save(user);
    delete saved.password;
    return saved;
  }
}
