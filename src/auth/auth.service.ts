import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt/dist';
import { CreateUserDto } from 'src/users/dto';
import { UsersService } from 'src/users/users.service';
import { SigninDto } from './dto/signin.dto';
import { GetAccessTokenDto } from './dto';
import { IPayload } from './interfaces';
import { Cache } from 'cache-manager';
import { getRefreshTokenKey } from 'src/utils/redis';
import { CACHE_MANAGER } from '@nestjs/cache-manager';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private config: ConfigService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache
  ) {}

  async signup(dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  async signin(dto: SigninDto) {
    const user = await this.userService.comparePassword(dto);
    const accessToken = await this.SignToken(user.id, user.username);
    const refreshToken = await this.SignRefreshToken(user.id, user.username);
    await this.cacheManager.set(getRefreshTokenKey(user.id), refreshToken);
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  async SignToken(userId: string, username: string) {
    const payload = {
      sub: userId,
      username,
    };

    return this.jwtService.signAsync(payload, {
      expiresIn: '15m',
      secret: this.config.get('JWT_SECRET'),
    });
  }

  async SignRefreshToken(userId: string, username: string) {
    const payload = {
      sub: userId,
      username,
    };
    return this.jwtService.signAsync(payload, {
      expiresIn: '30d',
      secret: this.config.get('JWT_SECREt'),
    });
  }

  async getAccessToken(dto: GetAccessTokenDto) {
    const payload: IPayload = await this.jwtService.verifyAsync(
      dto.refreshToken,
      {
        secret: this.config.get('JWT_SECRET'),
      }
    );
    const user = await this.userService.getOneOrThrow({
      where: { id: payload.sub },
    });

    if (payload.exp > 86400) {
      return {
        access_token: await this.SignToken(user.id, user.username),
        refresh_token: dto.refreshToken,
      };
    }

    const newRefreshToken = await this.SignRefreshToken(user.id, user.username);
    await this.cacheManager.set(getRefreshTokenKey(user.id), newRefreshToken);

    return {
      access_token: await this.SignToken(user.id, user.username),
      refresh_token: newRefreshToken,
    };
  }
}
