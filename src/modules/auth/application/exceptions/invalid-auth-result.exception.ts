import { AuthException } from './auth.exception';

export class InvalidAuthResultException extends AuthException {
  constructor(originalError: unknown | null = null) {
    super('Invalid authentication result', originalError);
  }
}