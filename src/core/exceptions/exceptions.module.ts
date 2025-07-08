import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';

import { AppExceptionMapper } from '~core/exceptions/domain/mappers/app-exception/app-exception.mapper';
import { GlobalExceptionsFilter } from '~core/exceptions/infrastructure/filters/global-exceptions/global-exceptions.filter';
import { ErrorInterceptor } from '~core/exceptions/infrastructure/interceptors/error/error.interceptor';

@Module({
  providers: [
    {
      useClass: GlobalExceptionsFilter,
      provide: APP_FILTER,
    },
    {
      useClass: ErrorInterceptor,
      provide: APP_INTERCEPTOR,
    },
    AppExceptionMapper,
  ],
})
export class ExceptionsModule {}
