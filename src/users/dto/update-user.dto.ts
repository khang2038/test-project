import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, IsString } from 'class-validator';
import { IsNotBlank } from 'src/decorators';
export class UpdateUserDto {
  @IsString()
  @IsNotBlank()
  @ApiProperty()
  @IsOptional()
  username?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  fullName?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  description?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  location?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  avatar?: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  @IsNotBlank()
  @ApiProperty()
  email?: string;

  @IsString()
  @IsOptional()
  @ApiProperty()
  phone?: string;
}
