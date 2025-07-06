import { IsEmail } from 'class-validator';

import { IEmailPasswordCredentials } from 'src/lib/passport-supabase/strategies/credentials-login';

export class EmailPasswordCredentialsDto implements IEmailPasswordCredentials {
  @IsEmail()
  public email: string;
  public password: string;
}