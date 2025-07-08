import { User as DomainUser } from '~modules/auth/domain/entities/user.entity';
import { Session } from '~modules/auth/domain/value-objects/session.value';

declare global {
  declare namespace Express {
    export interface Request {
      session?: Session | null;
      accessToken?: string;
      authenticatedClient?: SupabaseClient | null;
      client?: SupabaseClient;
    }

    export interface User extends DomainUser {}
  }
}
