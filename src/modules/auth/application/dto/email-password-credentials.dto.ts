import { IsEmail, IsEnum, IsString } from 'class-validator';

import { UserRole } from '~shared/domain/enums/user-role.enum';

import { IEmailPasswordCredentials } from 'src/lib/passport-supabase/strategies/credentials-login';

export class EmailPasswordCredentialsDto implements IEmailPasswordCredentials {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsEnum(UserRole)
  public role: UserRole;
}
