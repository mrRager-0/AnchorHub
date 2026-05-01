/**
 * HealthMonitor — anchor uptime polling and circuit breaker.
 *
 * PSEUDOCODE (checkAnchor):
 *   1. GET anchor's /.well-known/stellar.toml (lightweight probe)
 *   2. Measure latency
 *   3. Persist HealthCheck record
 *   4. If consecutive failures >= CIRCUIT_OPEN_THRESHOLD → mark anchor inactive
 *
 * PSEUDOCODE (getLatestAll):
 *   1. For each active anchor, fetch most recent HealthCheck
 *   2. Return [{ anchorId, isHealthy, latencyMs, checkedAt }]
 *
 * PSEUDOCODE (getHistory):
 *   1. Fetch last N HealthCheck records for anchorId
 *   2. Return array
 */

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const CIRCUIT_OPEN_THRESHOLD = 3;

export class HealthMonitor {
  async checkAnchor(anchorId: string): Promise<void> {
    // TODO: probe anchor, measure latency, persist HealthCheck
    // TODO: open circuit breaker if consecutive failures >= threshold
    throw new Error("Not implemented");
  }

  async getLatestAll() {
    // TODO: GROUP BY anchorId, return latest HealthCheck per anchor
    return prisma.healthCheck.findMany({
      orderBy: { checkedAt: "desc" },
      distinct: ["anchorId"],
    });
  }

  async getHistory(anchorId: string, limit = 50) {
    return prisma.healthCheck.findMany({
      where: { anchorId },
      orderBy: { checkedAt: "desc" },
      take: limit,
    });
  }
}
