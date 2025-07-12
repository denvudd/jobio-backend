import { ServerException } from '~core/exceptions/domain/exceptions/server-exception/server.exception';

export class InvalidRoleException extends ServerException {
  constructor(message: string) {
    super('500', message);
  }
}
