import { IsInt, IsPositive, IsString } from 'class-validator';

export class AppConfigModel {
  @IsString()
  DB_URL: string;

  @IsString()
  SUPABASE_URL: string;

  @IsString()
  SUPABASE_SECRET_KEY: string;

  @IsString()
  GOOGLE_OAUTH_CLIENT_ID: string;

  @IsString()
  GOOGLE_OAUTH_SECRET: string;

  @IsString()
  GOOGLE_OAUTH_CALLBACK_URL: string;

  @IsString()
  PASSWORD_RESET_REDIRECT_URL: string;

  @IsInt()
  @IsPositive()
  PASSWORD_RECOVERY_TIME: number;

  @IsString()
  CLIENT_AUTH_REDIRECT_URL: string;

  @IsString()
  JWT_SECRET: string;
}
