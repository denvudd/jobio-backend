import { Builder } from 'builder-pattern';

import { AppException } from '~core/exceptions/domain/exceptions/base/app.exception';
import { ExceptionType } from '~core/exceptions/domain/mappers/app-exception/exception-type';

export class CustomException extends AppException {
  public httpStatus: number;

  public readonly type = ExceptionType.DYNAMIC;

  public static builder() {
    return Builder(CustomException, { code: 'DYNAMIC_EXCEPTION' });
  }
}
