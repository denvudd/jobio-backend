import { CanActivate, Injectable } from '@nestjs/common';

import { AuthGuardToken } from '~modules/auth/constants';
import { SupabaseBaseAuthGuard } from '~modules/auth/infrastructure/supabase/guards/supabase-base-auth/supabase-base-auth.guard';

@Injectable()
export class CredentialsLoginAuthGuard
  extends SupabaseBaseAuthGuard(AuthGuardToken.EMAIL_PASSWORD)
  implements CanActivate {}
