import { AppException } from '~core/exceptions/domain/exceptions/base/app.exception';
import { ExceptionType } from '~core/exceptions/domain/mappers/app-exception/exception-type';

export abstract class TooManyRequestsException extends AppException {
  public type: ExceptionType = ExceptionType.TOO_MANY_REQUESTS;
}
