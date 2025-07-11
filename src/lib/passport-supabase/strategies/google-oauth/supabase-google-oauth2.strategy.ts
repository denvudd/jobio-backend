import { IOAuth2StrategyOptions } from 'src/lib/passport-oauth';

import { IAuthResult, ISupabaseClientOptions } from '~lib/passport-supabase/core';
import { SupabaseBaseOauth2Strategy } from '~lib/passport-supabase/strategies/supabase-base-oauth2';

export interface ISupabaseGoogleOAuthStrategyOptions extends ISupabaseClientOptions {
  clientId: string;
  clientSecret: string;
  callbackUrl: string;
  authorizationUrl?: string;
  tokenURL?: string;
}

export interface IGoogleParams {
  access_token: string;
  expires_in: number;
  scope: string;
  token_type: string;
  id_token: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface IGoogleUserProfile {}

export class SupabaseGoogleOAuth2Strategy extends SupabaseBaseOauth2Strategy<IGoogleParams, IGoogleUserProfile> {
  private static readonly DEFAULT_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
  private static readonly DEFAULT_TOKEN_URL = 'https://www.googleapis.com/oauth2/v4/token';

  constructor(options: ISupabaseGoogleOAuthStrategyOptions) {
    const oauthOptions: IOAuth2StrategyOptions = {
      clientID: options.clientId,
      authorizationURL: options.authorizationUrl ?? SupabaseGoogleOAuth2Strategy.DEFAULT_AUTH_URL,
      clientSecret: options.clientSecret,
      tokenURL: options.tokenURL ?? SupabaseGoogleOAuth2Strategy.DEFAULT_TOKEN_URL,
      callbackURL: options.callbackUrl,
      scope: ['profile', 'email'],
    };
    super({
      oauth: oauthOptions,
      ...options,
    });
  }

  protected async verify(profile: IGoogleParams): Promise<void> {
    const { data, error } = await this.supabaseClient.auth.signInWithIdToken({
      provider: 'google',
      token: profile.id_token,
    });

    if (error) {
      this.fail(error, error.status);
      return;
    }

    const authResult: IAuthResult = {
      user: data.user,
      session: data.session,
      authorizedClient: this.supabaseClient,
    };

    this.success(authResult);
  }
}
