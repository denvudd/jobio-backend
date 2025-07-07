import { IsArray, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateCandidateProfileDto {
  @IsString()
  @IsOptional()
  position?: string;

  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  skills?: string[];

  @IsNumber()
  @IsOptional()
  experience?: number;

  @IsNumber()
  @IsOptional()
  salaryExpectations?: number;

  @IsString()
  @IsOptional()
  englishLevel?: string;

  @IsString()
  @IsOptional()
  experienceDescription?: string;

  @IsString()
  @IsOptional()
  accomplishmentsDescription?: string;

  @IsString()
  @IsOptional()
  expectationsDescription?: string;

  @IsString()
  @IsOptional()
  employmentOptions?: string;

  @IsNumber()
  @IsOptional()
  hourlyRate?: number;

  @IsString()
  @IsOptional()
  preferredLanguage?: string;

  @IsString()
  @IsOptional()
  preferredCommunication?: string;
}
