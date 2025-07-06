import { UnauthorizedException } from '~core/exceptions/domain/exceptions/unauthorized-exception/unauthorized.exception';

export class AuthException extends UnauthorizedException {
  constructor(message: string, originalError: unknown | null = null) {
    super('AUTH_ERROR', message, originalError);
  }
}