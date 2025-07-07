import { AppException } from '~core/exceptions/domain/exceptions/base/app.exception';
import { ExceptionType } from '~core/exceptions/domain/mappers/app-exception/exception-type';

export abstract class UnauthorizedException extends AppException {
  public readonly type: ExceptionType = ExceptionType.AUTHENTICATION;

  constructor(code: string, message: string, originalError: unknown | null = null) {
    super(code, message, originalError);
  }
}
