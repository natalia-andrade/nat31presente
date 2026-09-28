import type { Config } from "@netlify/functions";
import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { bookPurchases } from "../../db/schema.js";

export default async (req: Request) => {
  if (req.method === "GET") {
    const rows = await db.select({ bookKey: bookPurchases.bookKey }).from(bookPurchases);
    return Response.json({ booked: rows.map((r) => r.bookKey) });
  }

  if (req.method === "POST") {
    const { bookKey } = await req.json();
    if (typeof bookKey !== "string" || !bookKey.trim()) {
      return Response.json({ error: "bookKey is required" }, { status: 400 });
    }
    await db.insert(bookPurchases).values({ bookKey }).onConflictDoNothing();
    return Response.json({ bookKey, booked: true }, { status: 201 });
  }

  if (req.method === "DELETE") {
    const { bookKey } = await req.json();
    if (typeof bookKey !== "string" || !bookKey.trim()) {
      return Response.json({ error: "bookKey is required" }, { status: 400 });
    }
    await db.delete(bookPurchases).where(eq(bookPurchases.bookKey, bookKey));
    return Response.json({ bookKey, booked: false });
  }

  return new Response("Method not allowed", { status: 405 });
};

export const config: Config = {
  path: "/api/book-purchase",
};
