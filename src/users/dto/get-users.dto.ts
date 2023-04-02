import { IsNumberString, IsOptional, IsString } from 'class-validator';
import { IsNotBlank } from 'src/decorators';

export class GetUsersDto {
  @IsString()
  @IsOptional()
  @IsNotBlank()
  q?: string;

  @IsString()
  @IsOptional()
  @IsNotBlank()
  status?: string;

  @IsOptional()
  @IsNotBlank()
  limit?: number;

  @IsNumberString()
  @IsOptional()
  @IsNotBlank()
  offset?: number;
}
