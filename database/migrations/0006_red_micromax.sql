ALTER TABLE "company_invitation" RENAME COLUMN "invited_by_user_id" TO "invited_by_recruiter_profile_id";--> statement-breakpoint
ALTER TABLE "company_invitation" RENAME COLUMN "accepted_by_user_id" TO "accepted_by_recruiter_profile_id";--> statement-breakpoint
ALTER TABLE "user_company" RENAME COLUMN "user_id" TO "recruiter_profile_id";--> statement-breakpoint
DROP INDEX IF EXISTS "company_invitation_invited_by_user_id_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "company_invitation_accepted_by_user_id_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "recruiter_profile_company_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "user_company_user_id_idx";--> statement-breakpoint
DROP INDEX IF EXISTS "user_company_user_company_unique";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "company_invitation" ADD CONSTRAINT "company_invitation_invited_by_recruiter_profile_id_recruiter_profile_id_fk" FOREIGN KEY ("invited_by_recruiter_profile_id") REFERENCES "public"."recruiter_profile"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "company_invitation" ADD CONSTRAINT "company_invitation_accepted_by_recruiter_profile_id_recruiter_profile_id_fk" FOREIGN KEY ("accepted_by_recruiter_profile_id") REFERENCES "public"."recruiter_profile"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_company" ADD CONSTRAINT "user_company_recruiter_profile_id_recruiter_profile_id_fk" FOREIGN KEY ("recruiter_profile_id") REFERENCES "public"."recruiter_profile"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "company_invitation_invited_by_recruiter_profile_id_idx" ON "company_invitation" USING btree ("invited_by_recruiter_profile_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "company_invitation_accepted_by_recruiter_profile_id_idx" ON "company_invitation" USING btree ("accepted_by_recruiter_profile_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_company_recruiter_profile_id_idx" ON "user_company" USING btree ("recruiter_profile_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_company_recruiter_company_unique" ON "user_company" USING btree ("recruiter_profile_id","company_id");--> statement-breakpoint
ALTER TABLE "recruiter_profile" DROP COLUMN IF EXISTS "company";