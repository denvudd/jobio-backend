import { Global, Module } from '@nestjs/common';

import { IAppConfigService } from '~shared/application/services/app-config-service.interface';
import { BaseToken } from '~shared/constants';
import { DrizzleDbContext } from '~shared/infrastructure/database/drizzle/db-context/drizzle-db-context';
import { mergeDbdSchema } from '~shared/infrastructure/database/drizzle/schema/merged-schema';

import { DrizzlePostgresModule } from 'src/lib/drizzle-postgres';

export const drizzlePostgresModule = DrizzlePostgresModule.registerAsync({
  useFactory: (appConfig: IAppConfigService) => ({
    db: {
      config: {
        connectionString: appConfig.get('DB_URL'),
      },
      connection: 'pool',
    },
    schema: mergeDbdSchema,
  }),
  inject: [BaseToken.APP_CONFIG],
});

@Global()
@Module({
  imports: [drizzlePostgresModule],
  providers: [{ provide: BaseToken.DB_CONTEXT, useClass: DrizzleDbContext }],
  exports: [BaseToken.DB_CONTEXT],
})
export class DatabaseModule {}
