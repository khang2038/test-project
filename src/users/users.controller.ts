import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtGuard)
  @Get('/profile')
  async GetProfile(@Request() req) {
    return req.user;
  }
}
