import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt/dist';
import { CreateUserDto } from 'src/users/dto';
import { UsersService } from 'src/users/users.service';
import { SigninDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  async signin(dto: SigninDto) {
    const user = await this.userService.comparePassword(dto);
    const token = await this.SignToken(user.id, user.username);
    return token;
  }

  async SignToken(userId: string, username: string) {
    const payload = {
      sub: userId,
      username,
    };

    return {
      access_token: await this.jwtService.signAsync(payload, {
        expiresIn: '15m',
        secret: this.config.get('JWT_SECRET'),
      }),
    };
  }
}
