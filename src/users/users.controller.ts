import {
  Body,
  Controller,
  Get,
  Patch,
  Put,
  Request,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtGuard } from 'src/auth/guard/jwt.guard';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './users.entity';
import { UsersService } from './users.service';
import { UpdatePasswordUserDto } from './dto/update-password-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Get('/profile')
  @ApiOkResponse({
    description: 'User has been successfully created.',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request.',
  })
  async GetProfile(@Request() req) {
    const user = req.user;
    delete user.password;
    return user;
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Patch('/profile')
  @ApiCreatedResponse({
    description: 'User has been successfully created.',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request.',
  })
  async updateProfile(@Body() dto: UpdateUserDto, @Request() req) {
    return this.userService.updateProfileUser(dto, req.user);
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Put('/password')
  @ApiOkResponse({
    description: 'User has been successfully updated passWord.',
    type: User,
  })
  @ApiBadRequestResponse({
    description: 'Bad Request.',
  })
  async updatePassword(@Body() dto: UpdatePasswordUserDto, @Request() req) {
    await this.userService.updatePassword(dto, req.user);
    return 'successfully';
  }
}
