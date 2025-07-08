import { mergeDbdSchema } from '~shared/infrastructure/database/drizzle/schema/merged-schema';

export type MergedDbSchema = typeof mergeDbdSchema;
