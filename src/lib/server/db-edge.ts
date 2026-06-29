import { neon } from "@neondatabase/serverless";
import { PrismaNeonHTTP } from "@prisma/adapter-neon";
import { PrismaClient } from "@prisma/client";

/** Prisma client for Cloudflare Workers / edge (Neon serverless HTTP). */
export function createEdgePrisma(databaseUrl: string): PrismaClient {
  const sql = neon(databaseUrl);
  const adapter = new PrismaNeonHTTP(sql);
  return new PrismaClient({ adapter });
}
