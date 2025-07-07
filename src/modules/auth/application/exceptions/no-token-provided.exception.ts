import { AuthException } from './auth.exception';

export class NoTokenProvidedException extends AuthException {
  constructor(originalError: unknown | null = null) {
    super('No token provided', originalError);
  }
}
