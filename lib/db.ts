import { PrismaClient } from "@prisma/client";

// HACK -> Nextjs has hot reloading and we dont want to
// reinitialize the PrismaClient over and over.
declare global {
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.prisma = db;
}
