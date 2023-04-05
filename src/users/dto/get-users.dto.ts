import { ApiProperty } from '@nestjs/swagger';
import { IsNumberString, IsOptional, IsString } from 'class-validator';
import { IsNotBlank } from 'src/decorators';

export class GetUsersDto {
  @IsString()
  @IsOptional()
  @IsNotBlank()
  @ApiProperty({ required: false })
  q?: string;

  @IsString()
  @IsOptional()
  @IsNotBlank()
  @ApiProperty({ required: false })
  status?: string;

  @IsOptional()
  @IsNotBlank()
  @ApiProperty({ required: false })
  limit?: number;

  @IsNumberString()
  @IsOptional()
  @IsNotBlank()
  @ApiProperty({ required: false })
  offset?: number;
}
