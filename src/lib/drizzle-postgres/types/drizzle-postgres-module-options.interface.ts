import { DrizzleDbOptions } from "../services/drizzle-postgres";

export interface IDrizzlePostgresModuleOptions {
  db: DrizzleDbOptions;
  schema: Record<string, unknown>;
}
