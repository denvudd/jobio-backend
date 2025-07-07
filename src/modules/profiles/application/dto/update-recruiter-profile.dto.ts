import { IsOptional, IsString } from 'class-validator';

export class UpdateRecruiterProfileDto {
  @IsString()
  @IsOptional()
  telegram?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsOptional()
  linkedin?: string;

  @IsString()
  @IsOptional()
  company?: string;

  @IsString()
  @IsOptional()
  website?: string;
} 