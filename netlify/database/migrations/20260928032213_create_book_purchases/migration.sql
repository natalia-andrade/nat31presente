CREATE TABLE "book_purchases" (
	"id" serial PRIMARY KEY,
	"book_key" text NOT NULL UNIQUE,
	"created_at" timestamp DEFAULT now()
);
