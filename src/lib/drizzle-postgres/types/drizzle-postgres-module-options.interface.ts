import { DrizzleDbOptions } from '~lib/drizzle-postgres/services/drizzle-postgres';

export interface IDrizzlePostgresModuleOptions {
  db: DrizzleDbOptions;
  schema: Record<string, unknown>;
}
