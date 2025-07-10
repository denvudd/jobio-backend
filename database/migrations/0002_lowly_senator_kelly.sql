CREATE TABLE IF NOT EXISTS "category" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "sub_category" (
	"id" uuid PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"category_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"updated_at" timestamp with time zone DEFAULT now()
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "sub_category" ADD CONSTRAINT "sub_category_category_id_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."category"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "category_name_idx" ON "category" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "category_name_unique" ON "category" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "sub_category_name_idx" ON "sub_category" USING btree ("name");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "sub_category_name_unique" ON "sub_category" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "sub_category_category_id_idx" ON "sub_category" USING btree ("category_id");--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "sub_category_category_id_unique" ON "sub_category" USING btree ("category_id");