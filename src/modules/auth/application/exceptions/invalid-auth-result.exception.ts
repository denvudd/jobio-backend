import { AuthException } from '~modules/auth/application/exceptions/auth.exception';

export class InvalidAuthResultException extends AuthException {
  constructor(originalError: unknown | null = null) {
    super('Invalid authentication result', originalError);
  }
}
