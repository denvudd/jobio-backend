import { ConfigurableModuleBuilder, DynamicModule, Module } from '@nestjs/common';

import { POSTGRES_DB } from '~lib/drizzle-postgres/constants';
import { DrizzlePostgresService } from '~lib/drizzle-postgres/services/drizzle-postgres/drizzle-postgres.service';
import { IDrizzlePostgresModuleOptions } from '~lib/drizzle-postgres/types/drizzle-postgres-module-options.interface';
import { IWithProviderToken } from '~lib/drizzle-postgres/with-provider-token.interface';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const { ConfigurableModuleClass, ASYNC_OPTIONS_TYPE, MODULE_OPTIONS_TOKEN, OPTIONS_TYPE } =
  new ConfigurableModuleBuilder<IDrizzlePostgresModuleOptions>()
    .setClassMethodName('register')
    .setExtras({ isGlobal: true }, (definition, extras) => ({
      ...definition,
      global: extras.isGlobal,
    }))
    .build();

type Options = typeof OPTIONS_TYPE & IWithProviderToken;
type AsyncOptions = typeof ASYNC_OPTIONS_TYPE & IWithProviderToken;

@Module({})
export class DrizzlePostgresModule extends ConfigurableModuleClass {
  public static register(options: Options): DynamicModule {
    const { providers = [], exports = [], ...other } = super.register(options);
    const injectionToken = options.provideAs ?? POSTGRES_DB;
    return {
      providers: [
        ...providers,
        DrizzlePostgresService,
        {
          provide: injectionToken,
          useFactory: async (drizzleService: DrizzlePostgresService) => {
            return drizzleService.getDrizzle(options.db, options.schema);
          },
          inject: [DrizzlePostgresService],
        },
      ],
      exports: [...exports, injectionToken],
      ...other,
    };
  }

  public static registerAsync(options: AsyncOptions): DynamicModule {
    const { providers = [], exports = [], ...other } = super.registerAsync(options);
    const injectionToken = options.provideAs ?? POSTGRES_DB;

    return {
      providers: [
        ...providers,
        DrizzlePostgresService,
        {
          provide: injectionToken,
          useFactory: async (drizzleService: DrizzlePostgresService, options: IDrizzlePostgresModuleOptions) => {
            return drizzleService.getDrizzle(options.db, options.schema);
          },
          inject: [DrizzlePostgresService, MODULE_OPTIONS_TOKEN],
        },
      ],
      exports: [...exports, injectionToken],
      ...other,
    };
  }
}
