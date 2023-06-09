import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IsNotBlank } from 'src/decorators';

export class SigninDto {
  @ApiProperty()
  @IsString()
  @IsNotBlank()
  username: string;

  @ApiProperty()
  @IsString()
  @IsNotBlank()
  password: string;
}
