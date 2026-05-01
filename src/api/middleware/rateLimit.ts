/**
 * Per-API-key rate limiting via Redis sliding window.
 *
 * PSEUDOCODE:
 *   1. Extract apiKeyId from request context (set by authMiddleware)
 *   2. Build Redis key: "rl:<apiKeyId>:<windowStart>"
 *   3. INCR counter; set TTL on first increment
 *   4. If counter > RATE_LIMIT_MAX → 429 with Retry-After header
 *   5. Set X-RateLimit-Remaining header
 *
 * Uses @fastify/rate-limit plugin registered in app entrypoint.
 * This file exports the per-route config override factory.
 */

import { RateLimitOptions } from "@fastify/rate-limit";

const RATE_LIMIT_MAX = 100;       // requests per window
const RATE_LIMIT_WINDOW = 60_000; // 1 minute in ms

export function rateLimitConfig(max = RATE_LIMIT_MAX): RateLimitOptions {
  return {
    max,
    timeWindow: RATE_LIMIT_WINDOW,
    keyGenerator: (req) => {
      // TODO: use authenticated apiKeyId once auth middleware attaches it
      return req.ip;
    },
  };
}
