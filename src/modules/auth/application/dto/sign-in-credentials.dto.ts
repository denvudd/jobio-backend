import { IsEmail, IsString } from 'class-validator';

import { IEmailPasswordCredentials } from 'src/lib/passport-supabase/strategies/credentials-login';

export class SignInCredentialsDto implements IEmailPasswordCredentials {
  @IsEmail()
  public email: string;

  @IsString()
  public password: string;
}
