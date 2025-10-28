CREATE TABLE "webhooks" (
	"id" text PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"method" text NOT NULL,
	"path_name" text NOT NULL,
	"ip" text NOT NULL,
	"status_code" integer DEFAULT 200 NOT NULL,
	"content_type" text DEFAULT 'application/json' NOT NULL,
	"content_length" integer DEFAULT 0 NOT NULL,
	"query_params" jsonb NOT NULL,
	"headers" jsonb NOT NULL,
	"body" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
