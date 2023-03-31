import { Body, Controller } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger/dist';
import { CreateUserDto } from 'src/users/dto';
import { User } from 'src/users/users.entity';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({
    description: 'User has been successfully created.',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request.',
  })
  @Post('/signup')
  signup(@Body() dto: CreateUserDto) {
    return this.authService.signup(dto);
  }

  @ApiBody({ type: SigninDto })
  @ApiOkResponse({
    description: 'singin successfully',
  })
  @Post('/signin')
  signin(@Body() dto: SigninDto) {
    return this.authService.signin(dto);
  }
}
