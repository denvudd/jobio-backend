import { AuthException } from './auth.exception';

export class InvalidAccessTokenException extends AuthException {
  constructor(originalError: unknown | null = null) {
    super('Invalid access token', originalError);
  }
}