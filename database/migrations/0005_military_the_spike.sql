CREATE TABLE IF NOT EXISTS "company" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"description" text,
	"website" varchar(255),
	"logo" varchar(500),
	"industry" varchar(255),
	"size" varchar(50),
	"location" varchar(255),
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "company_invitation" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"company_id" uuid NOT NULL,
	"invited_by_user_id" uuid NOT NULL,
	"company_role_id" uuid NOT NULL,
	"email" varchar(255) NOT NULL,
	"first_name" varchar(255),
	"last_name" varchar(255),
	"message" text,
	"token" varchar(255) NOT NULL,
	"status" varchar(50) DEFAULT 'pending' NOT NULL,
	"expires_at" timestamp with time zone NOT NULL,
	"accepted_at" timestamp with time zone,
	"accepted_by_user_id" uuid,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "company_permission" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "company_role" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(100) NOT NULL,
	"description" text,
	"is_default" boolean DEFAULT false NOT NULL,
	"is_system" boolean DEFAULT false NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "company_role_permission" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"company_role_id" uuid NOT NULL,
	"company_permission_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_company" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"company_id" uuid NOT NULL,
	"company_role_id" uuid NOT NULL,
	"is_active" boolean DEFAULT true NOT NULL,
	"joined_at" timestamp with time zone DEFAULT now(),
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "company_invitation" ADD CONSTRAINT "company_invitation_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."company"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "company_invitation" ADD CONSTRAINT "company_invitation_company_role_id_company_role_id_fk" FOREIGN KEY ("company_role_id") REFERENCES "public"."company_role"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "company_role_permission" ADD CONSTRAINT "company_role_permission_company_role_id_company_role_id_fk" FOREIGN KEY ("company_role_id") REFERENCES "public"."company_role"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "company_role_permission" ADD CONSTRAINT "company_role_permission_company_permission_id_company_permission_id_fk" FOREIGN KEY ("company_permission_id") REFERENCES "public"."company_permission"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_company" ADD CONSTRAINT "user_company_company_id_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."company"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_company" ADD CONSTRAINT "user_company_company_role_id_company_role_id_fk" FOREIGN KEY ("company_role_id") REFERENCES "public"."company_role"("id") ON DELETE restrict ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "company_name_idx" ON "company" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "company_industry_idx" ON "company" USING btree ("industry");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "company_is_active_idx" ON "company" USING btree ("is_active");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "company_invitation_company_id_idx" ON "company_invitation" USING btree ("company_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "company_invitation_invited_by_user_id_idx" ON "company_invitation" USING btree ("invited_by_user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "company_invitation_email_idx" ON "company_invitation" USING btree ("email");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "company_invitation_token_idx" ON "company_invitation" USING btree ("token");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "company_invitation_status_idx" ON "company_invitation" USING btree ("status");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "company_invitation_expires_at_idx" ON "company_invitation" USING btree ("expires_at");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "company_invitation_accepted_by_user_id_idx" ON "company_invitation" USING btree ("accepted_by_user_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "company_invitation_token_unique" ON "company_invitation" USING btree ("token");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "company_invitation_pending_email_company_unique" ON "company_invitation" USING btree ("email","company_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "company_permission_name_idx" ON "company_permission" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "company_permission_name_unique" ON "company_permission" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "company_role_name_idx" ON "company_role" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "company_role_is_default_idx" ON "company_role" USING btree ("is_default");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "company_role_is_system_idx" ON "company_role" USING btree ("is_system");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "company_role_name_unique" ON "company_role" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "company_role_permission_role_id_idx" ON "company_role_permission" USING btree ("company_role_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "company_role_permission_permission_id_idx" ON "company_role_permission" USING btree ("company_permission_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "company_role_permission_unique" ON "company_role_permission" USING btree ("company_role_id","company_permission_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_company_user_id_idx" ON "user_company" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_company_company_id_idx" ON "user_company" USING btree ("company_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_company_role_id_idx" ON "user_company" USING btree ("company_role_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_company_is_active_idx" ON "user_company" USING btree ("is_active");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "user_company_user_company_unique" ON "user_company" USING btree ("user_id","company_id");