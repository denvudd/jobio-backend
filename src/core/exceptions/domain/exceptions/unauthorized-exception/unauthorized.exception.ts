import { ExceptionType } from '../../mappers/app-exception/exception-type';
import { AppException } from '../base/app.exception';

export abstract class UnauthorizedException extends AppException {
  public readonly type: ExceptionType = ExceptionType.AUTHENTICATION;

  constructor(code: string, message: string, originalError: unknown | null = null) {
    super(code, message, originalError);
  }
}
