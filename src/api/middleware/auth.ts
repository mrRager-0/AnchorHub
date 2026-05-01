/**
 * API key authentication middleware.
 *
 * PSEUDOCODE:
 *   1. Extract "Authorization: Bearer <key>" header
 *   2. If missing → 401
 *   3. Parse key prefix (first 8 chars) for DB lookup
 *   4. Fetch ApiKey records matching prefix from DB
 *   5. Argon2 verify key against each candidate hash
 *   6. If no match → 401
 *   7. If key.isActive === false → 403
 *   8. Update key.lastUsedAt (fire-and-forget)
 *   9. Attach apiKey to request context
 */

import { FastifyRequest, FastifyReply } from "fastify";
import argon2 from "argon2";
import { prisma } from "../db/client";

export async function authMiddleware(req: FastifyRequest, reply: FastifyReply) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return reply.status(401).send({ error: "Missing API key" });
  }

  const rawKey = authHeader.slice(7);
  const prefix = rawKey.slice(0, 8);

  // TODO: fetch candidates by prefix, verify with argon2
  // TODO: attach verified ApiKey to req context
  // TODO: update lastUsedAt asynchronously

  // Placeholder — replace with real verification
  if (!rawKey) {
    return reply.status(401).send({ error: "Invalid API key" });
  }
}
