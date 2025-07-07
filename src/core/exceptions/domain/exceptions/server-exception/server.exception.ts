import { AppException } from '~core/exceptions/domain/exceptions/base/app.exception';
import { ExceptionType } from '~core/exceptions/domain/mappers/app-exception/exception-type';

export abstract class ServerException extends AppException {
  public readonly type: ExceptionType = ExceptionType.SERVER;
}
