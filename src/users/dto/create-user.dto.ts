import { IsEmail, IsString } from 'class-validator';
import { IsNotBlank } from 'src/decorators/is-not-blank.decorator';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotBlank()
  username: string;

  @IsString()
  @IsNotBlank()
  password: string;
}
