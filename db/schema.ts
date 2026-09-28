import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const bookPurchases = pgTable("book_purchases", {
  id: serial().primaryKey(),
  bookKey: text("book_key").notNull().unique(),
  createdAt: timestamp("created_at").defaultNow(),
});
