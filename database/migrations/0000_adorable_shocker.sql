CREATE TABLE IF NOT EXISTS "candidate_profile" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_details_id" uuid NOT NULL,
	"position" varchar(255),
	"skills" text[] DEFAULT '{}',
	"experience" smallint,
	"salary_expectations" bigint,
	"english_level" varchar(50),
	"experience_description" text,
	"accomplishments_description" text,
	"expectations_description" text,
	"employment_options" varchar(255),
	"hourly_rate" integer,
	"preferred_language" varchar(50),
	"preferred_communication" varchar(255),
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "recruiter_profile" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_details_id" uuid NOT NULL,
	"telegram" varchar(100),
	"phone" varchar(20),
	"linkedin" varchar(255),
	"company" varchar(255),
	"website" varchar(255),
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_details" (
	"id" uuid PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"full_name" varchar(255),
	"role" varchar(50) DEFAULT 'candidate' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "candidate_profile" ADD CONSTRAINT "candidate_profile_user_details_id_user_details_id_fk" FOREIGN KEY ("user_details_id") REFERENCES "public"."user_details"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "recruiter_profile" ADD CONSTRAINT "recruiter_profile_user_details_id_user_details_id_fk" FOREIGN KEY ("user_details_id") REFERENCES "public"."user_details"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_details" ADD CONSTRAINT "user_details_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "candidate_profile_user_details_id_idx" ON "candidate_profile" USING btree ("user_details_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "candidate_profile_position_idx" ON "candidate_profile" USING btree ("position");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "candidate_profile_user_details_id_unique" ON "candidate_profile" USING btree ("user_details_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "recruiter_profile_user_details_id_idx" ON "recruiter_profile" USING btree ("user_details_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "recruiter_profile_company_idx" ON "recruiter_profile" USING btree ("company");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "recruiter_profile_user_details_id_unique" ON "recruiter_profile" USING btree ("user_details_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_details_user_id_idx" ON "user_details" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_details_role_idx" ON "user_details" USING btree ("role");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_details_user_id_unique" ON "user_details" USING btree ("user_id");