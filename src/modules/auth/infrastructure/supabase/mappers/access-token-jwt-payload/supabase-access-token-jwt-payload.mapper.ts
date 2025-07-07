import { Injectable } from '@nestjs/common';

import { User } from '~modules/auth/domain/entities/user.entity';

export interface SupabaseAccessTokenJwtPayload {
  iss: string;
  sub: string;
  aud: string;
  exp: number;
  iat: number;
  email: string;
  phone: string;
  app_metadata: {
    provider: string;
    providers: string[];
  };
  user_metadata: {
    email: string;
    email_verified: boolean;
    phone_verified: boolean;
    sub: string;
  };
  role: string;
  aal: string;
  amr: Array<{
    method: string;
    timestamp: number;
  }>;
  session_id: string;
  is_anonymous: boolean;
}

@Injectable()
export class SupabaseAccessTokenJwtPayloadMapper {
  toDomain(supabaseAccessTokenJwtPayload: SupabaseAccessTokenJwtPayload): User {
    return User.builder(supabaseAccessTokenJwtPayload.sub)
      .email(supabaseAccessTokenJwtPayload.email)
      .phone(supabaseAccessTokenJwtPayload.phone)
      .role(supabaseAccessTokenJwtPayload.role)
      .build();
  }
}
