import { ExceptionType } from '~core/exceptions/domain/mappers/app-exception/exception-type';
import { AppException } from '~core/exceptions/domain/exceptions/base/app.exception';

export abstract class ClientException extends AppException {
  public readonly type: ExceptionType = ExceptionType.CLIENT;
}
