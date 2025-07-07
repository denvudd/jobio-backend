import { IsEnum, IsOptional, IsString } from 'class-validator';
import { UserRole } from '~shared/domain/enums/user-role.enum';

export class CreateUserProfileDto {
  @IsString()
  @IsOptional()
  fullName?: string;

  @IsEnum(UserRole)
  role: UserRole;
} 