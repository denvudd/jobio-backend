import { IsEmail, IsEnum, IsString } from 'class-validator';

import { UserRole } from '~shared/domain/enums/user-role.enum';

import { IEmailPasswordCredentials } from 'src/lib/passport-supabase/strategies/credentials-login';

export interface IEmailPasswordRegistrationCredentials extends IEmailPasswordCredentials {
  role: UserRole;
}

export class SignUpCredentialsDto implements IEmailPasswordRegistrationCredentials {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;

  @IsEnum(UserRole)
  public role: UserRole;
}
