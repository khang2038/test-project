import { Body, Controller } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger/dist';
import { CreateUserDto } from 'src/users/dto';
import { User } from 'src/users/users.entity';
import { AuthService } from './auth.service';
import { SigninDto } from './dto/signin.dto';
import { GetAccessTokenDto } from './dto';

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
  @ApiOperation({ summary: 'sign up ' })
  signUp(@Body() dto: CreateUserDto) {
    return this.authService.signup(dto);
  }

  @ApiBody({ type: SigninDto })
  @ApiOkResponse({
    description: 'singin successfully',
  })
  @Post('/signin')
  @ApiOperation({ summary: 'sign in' })
  signIn(@Body() dto: SigninDto) {
    return this.authService.signin(dto);
  }

  @ApiBody({ type: GetAccessTokenDto })
  @ApiOkResponse({
    description: 'get accessToken successfully',
  })
  @ApiOperation({ summary: 'Get access token by refresh token' })
  @Post('/get-access-token')
  getAccessToken(@Body() dto: GetAccessTokenDto) {
    return this.authService.getAccessToken(dto);
  }
}
