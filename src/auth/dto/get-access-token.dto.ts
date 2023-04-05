import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { IsNotBlank } from 'src/decorators';

export class GetAccessTokenDto {
  @IsString()
  @IsNotBlank()
  @ApiProperty()
  refreshToken: string;
}
