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
  boolean,
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
    website: varchar('website', { length: 255 }),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).defaultNow(),
  },
  (table) => ({
    userDetailsIdIdx: index('recruiter_profile_user_details_id_idx').on(table.userDetailsId),
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
    categoryNameUnique: uniqueIndex('sub_category_category_name_unique').on(table.categoryId, table.name),
  }),
);

export const company = pgTable(
  'company',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    name: varchar('name', { length: 255 }).notNull(),
    description: text('description'),
    website: varchar('website', { length: 255 }),
    logo: varchar('logo', { length: 500 }),
    industry: varchar('industry', { length: 255 }),
    size: varchar('size', { length: 50 }),
    location: varchar('location', { length: 255 }),
    isActive: boolean('is_active').notNull().default(true),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).defaultNow(),
  },
  (table) => ({
    nameIdx: index('company_name_idx').on(table.name),
    industryIdx: index('company_industry_idx').on(table.industry),
    isActiveIdx: index('company_is_active_idx').on(table.isActive),
  }),
);

export const companyPermission = pgTable(
  'company_permission',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    name: varchar('name', { length: 100 }).notNull(),
    description: text('description'),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).defaultNow(),
  },
  (table) => ({
    nameIdx: index('company_permission_name_idx').on(table.name),
    nameUnique: uniqueIndex('company_permission_name_unique').on(table.name),
  }),
);

export const companyRole = pgTable(
  'company_role',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    name: varchar('name', { length: 100 }).notNull(),
    description: text('description'),
    isDefault: boolean('is_default').notNull().default(false),
    isSystem: boolean('is_system').notNull().default(false), // For system roles like Owner, Admin
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).defaultNow(),
  },
  (table) => ({
    nameIdx: index('company_role_name_idx').on(table.name),
    isDefaultIdx: index('company_role_is_default_idx').on(table.isDefault),
    isSystemIdx: index('company_role_is_system_idx').on(table.isSystem),
    nameUnique: uniqueIndex('company_role_name_unique').on(table.name),
  }),
);

export const companyRolePermission = pgTable(
  'company_role_permission',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    companyRoleId: uuid('company_role_id')
      .references(() => companyRole.id, { onDelete: 'cascade' })
      .notNull(),
    companyPermissionId: uuid('company_permission_id')
      .references(() => companyPermission.id, { onDelete: 'cascade' })
      .notNull(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow(),
  },
  (table) => ({
    companyRoleIdIdx: index('company_role_permission_role_id_idx').on(table.companyRoleId),
    companyPermissionIdIdx: index('company_role_permission_permission_id_idx').on(table.companyPermissionId),
    rolePermissionUnique: uniqueIndex('company_role_permission_unique').on(table.companyRoleId, table.companyPermissionId),
  }),
);

export const userCompany = pgTable(
  'user_company',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    recruiterProfileId: uuid('recruiter_profile_id')
      .references(() => recruiterProfile.id, { onDelete: 'cascade' })
      .notNull(),
    companyId: uuid('company_id')
      .references(() => company.id, { onDelete: 'cascade' })
      .notNull(),
    companyRoleId: uuid('company_role_id')
      .references(() => companyRole.id, { onDelete: 'restrict' })
      .notNull(),
    isActive: boolean('is_active').notNull().default(true),
    joinedAt: timestamp('joined_at', { withTimezone: true, mode: 'date' }).defaultNow(),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).defaultNow(),
  },
  (table) => ({
    recruiterProfileIdIdx: index('user_company_recruiter_profile_id_idx').on(table.recruiterProfileId),
    companyIdIdx: index('user_company_company_id_idx').on(table.companyId),
    companyRoleIdIdx: index('user_company_role_id_idx').on(table.companyRoleId),
    isActiveIdx: index('user_company_is_active_idx').on(table.isActive),
    recruiterCompanyUnique: uniqueIndex('user_company_recruiter_company_unique').on(table.recruiterProfileId, table.companyId),
  }),
);

export const companyInvitation = pgTable(
  'company_invitation',
  {
    id: uuid('id').primaryKey().notNull().defaultRandom(),
    companyId: uuid('company_id')
      .references(() => company.id, { onDelete: 'cascade' })
      .notNull(),
    invitedByRecruiterProfileId: uuid('invited_by_recruiter_profile_id')
      .references(() => recruiterProfile.id, { onDelete: 'cascade' })
      .notNull(),
    companyRoleId: uuid('company_role_id')
      .references(() => companyRole.id, { onDelete: 'restrict' })
      .notNull(),
    email: varchar('email', { length: 255 }).notNull(),
    firstName: varchar('first_name', { length: 255 }),
    lastName: varchar('last_name', { length: 255 }),
    message: text('message'),
    token: varchar('token', { length: 255 }).notNull(),
    status: varchar('status', { length: 50 }).notNull().default('pending'), // pending, accepted, declined, expired
    expiresAt: timestamp('expires_at', { withTimezone: true, mode: 'date' }).notNull(),
    acceptedAt: timestamp('accepted_at', { withTimezone: true, mode: 'date' }),
    acceptedByRecruiterProfileId: uuid('accepted_by_recruiter_profile_id')
      .references(() => recruiterProfile.id, { onDelete: 'set null' }),
    createdAt: timestamp('created_at', { withTimezone: true, mode: 'date' }).defaultNow(),
    updatedAt: timestamp('updated_at', { withTimezone: true, mode: 'date' }).defaultNow(),
  },
  (table) => ({
    companyIdIdx: index('company_invitation_company_id_idx').on(table.companyId),
    invitedByRecruiterProfileIdIdx: index('company_invitation_invited_by_recruiter_profile_id_idx').on(table.invitedByRecruiterProfileId),
    emailIdx: index('company_invitation_email_idx').on(table.email),
    tokenIdx: index('company_invitation_token_idx').on(table.token),
    statusIdx: index('company_invitation_status_idx').on(table.status),
    expiresAtIdx: index('company_invitation_expires_at_idx').on(table.expiresAt),
    acceptedByRecruiterProfileIdIdx: index('company_invitation_accepted_by_recruiter_profile_id_idx').on(table.acceptedByRecruiterProfileId),
    tokenUnique: uniqueIndex('company_invitation_token_unique').on(table.token),
    // Constraint: Only one pending invitation per email per company
    pendingEmailCompanyUnique: uniqueIndex('company_invitation_pending_email_company_unique').on(table.email, table.companyId),
  }),
);
