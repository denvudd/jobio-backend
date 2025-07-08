import { Global, Module } from '@nestjs/common';

import { ExceptionsModule } from '~core/exceptions/exceptions.module';
import { LoggerModule } from '~core/logger/logger.module';
import { ValidationModule } from '~core/validation/validation.module';

@Global()
@Module({
  imports: [ValidationModule, ExceptionsModule, LoggerModule],
})
export class CoreModule {}
