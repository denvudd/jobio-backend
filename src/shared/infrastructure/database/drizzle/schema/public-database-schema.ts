import {
  bigint,
  index,
  integer,
  pgTable,
  smallint,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from 'drizzle-orm/pg-core';

export const userDetails = pgTable(
  'user_details',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    userId: uuid('user_id').notNull(),
    fullName: varchar('full_name', { length: 255 }),
    role: varchar('role', { length: 50 }).notNull().default('candidate'),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).defaultNow(),
  },
  (table) => ({
    userIdIdx: index('user_details_user_id_idx').on(table.userId),
    roleIdx: index('user_details_role_idx').on(table.role),
    userIdUnique: uniqueIndex('user_details_user_id_unique').on(table.userId),
  }),
);

export const candidateProfile = pgTable(
  'candidate_profile',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    userDetailsId: uuid('user_details_id')
      .references(() => userDetails.id, { onDelete: 'cascade' })
      .notNull(),
    position: varchar('position', { length: 255 }),
    skills: text('skills').array().default([]),
    experience: smallint('experience'),
    salaryExpectations: bigint('salary_expectations', { mode: 'number' }),
    englishLevel: varchar('english_level', { length: 50 }),
    experienceDescription: text('experience_description'),
    accomplishmentsDescription: text('accomplishments_description'),
    expectationsDescription: text('expectations_description'),
    employmentOptions: varchar('employment_options', { length: 255 }),
    hourlyRate: integer('hourly_rate'),
    preferredLanguage: varchar('preferred_language', { length: 50 }),
    preferredCommunication: varchar('preferred_communication', { length: 255 }),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).defaultNow(),
  },
  (table) => ({
    userDetailsIdIdx: index('candidate_profile_user_details_id_idx').on(table.userDetailsId),
    positionIdx: index('candidate_profile_position_idx').on(table.position),
    userDetailsIdUnique: uniqueIndex('candidate_profile_user_details_id_unique').on(table.userDetailsId),
  }),
);

export const recruiterProfile = pgTable(
  'recruiter_profile',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    userDetailsId: uuid('user_details_id')
      .references(() => userDetails.id, { onDelete: 'cascade' })
      .notNull(),
    telegram: varchar('telegram', { length: 100 }),
    phone: varchar('phone', { length: 20 }),
    linkedin: varchar('linkedin', { length: 255 }),
    company: varchar('company', { length: 255 }),
    website: varchar('website', { length: 255 }),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).defaultNow(),
  },
  (table) => ({
    userDetailsIdIdx: index('recruiter_profile_user_details_id_idx').on(table.userDetailsId),
    companyIdx: index('recruiter_profile_company_idx').on(table.company),
    userDetailsIdUnique: uniqueIndex('recruiter_profile_user_details_id_unique').on(table.userDetailsId),
  }),
);

export const category = pgTable(
  'category',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    name: varchar('name', { length: 255 }).notNull(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).defaultNow(),
  },
  (table) => ({
    nameIdx: index('category_name_idx').on(table.name),
    nameUnique: uniqueIndex('category_name_unique').on(table.name),
  }),
);

export const subCategory = pgTable(
  'sub_category',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    name: varchar('name', { length: 255 }).notNull(),
    categoryId: uuid('category_id')
      .references(() => category.id, { onDelete: 'cascade' })
      .notNull(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).defaultNow(),
  },
  (table) => ({
    nameIdx: index('sub_category_name_idx').on(table.name),
    nameUnique: uniqueIndex('sub_category_name_unique').on(table.name),
    categoryIdIdx: index('sub_category_category_id_idx').on(table.categoryId),
    categoryIdUnique: uniqueIndex('sub_category_category_id_unique').on(table.categoryId),
  }),
);
