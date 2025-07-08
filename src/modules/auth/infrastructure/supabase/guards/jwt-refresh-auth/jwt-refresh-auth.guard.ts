import { CanActivate, Injectable } from '@nestjs/common';

import { AuthGuardToken } from '~modules/auth/constants';
import { SupabaseBaseAuthGuard } from '~modules/auth/infrastructure/supabase/guards/supabase-base-auth/supabase-base-auth.guard';

@Injectable()
export class JwtRefreshAuthGuard extends SupabaseBaseAuthGuard(AuthGuardToken.JWT_REFRESH) implements CanActivate {}
