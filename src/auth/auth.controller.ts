import { Body, Controller, HttpCode, HttpStatus } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post('/signup')
  signup(@Body() dto: CreateUserDto) {
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/signin')
  signin(@Body() dto: CreateUserDto) {
    return this.authService.signin(dto);
  }
}
