CREATE TABLE "nutrition" (
	"id" serial PRIMARY KEY NOT NULL,
	"recipe_id" integer,
	"calories" integer NOT NULL,
	"protein" real NOT NULL,
	"carbs" real NOT NULL,
	"fat" real NOT NULL
);
--> statement-breakpoint
CREATE TABLE "recipes" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"instructions" text NOT NULL,
	"image_url" text,
	"cooking_time" integer,
	"cost_level" text,
	"is_zero_waste" boolean DEFAULT false,
	"sustainability_tip" text
);
--> statement-breakpoint
CREATE TABLE "user_profiles" (
	"id" serial PRIMARY KEY NOT NULL,
	"clerk_id" text,
	"name" text,
	"daily_calorie_goal" integer,
	"diet_preference" text,
	CONSTRAINT "user_profiles_clerk_id_unique" UNIQUE("clerk_id")
);
--> statement-breakpoint
ALTER TABLE "nutrition" ADD CONSTRAINT "nutrition_recipe_id_recipes_id_fk" FOREIGN KEY ("recipe_id") REFERENCES "public"."recipes"("id") ON DELETE no action ON UPDATE no action;