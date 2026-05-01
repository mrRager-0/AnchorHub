/**
 * GET /api/v1/health            — AnchorHub service health (liveness probe)
 * GET /api/v1/health/anchors    — per-anchor health metrics
 * GET /api/v1/health/anchors/:id — single anchor health history
 *
 * PSEUDOCODE (service health):
 *   1. Check DB connectivity
 *   2. Check Redis connectivity
 *   3. Return { status: "ok"|"degraded", db, redis, uptime }
 *
 * PSEUDOCODE (anchor health):
 *   1. Query latest HealthCheck per anchor from DB
 *   2. Return [{ anchorId, isHealthy, latencyMs, checkedAt }]
 */

import { FastifyInstance } from "fastify";
import { HealthMonitor } from "../../services/HealthMonitor";

export async function healthRoutes(app: FastifyInstance) {
  const monitor = new HealthMonitor();

  // Service liveness
  app.get("/", async (_req, reply) => {
    // TODO: ping DB and Redis, return aggregate status
    return reply.send({ status: "ok", uptime: process.uptime() });
  });

  // All anchors health summary
  app.get("/anchors", async (_req, reply) => {
    const results = await monitor.getLatestAll();
    return reply.send({ data: results });
  });

  // Single anchor health history
  app.get<{ Params: { id: string } }>("/anchors/:id", async (req, reply) => {
    const history = await monitor.getHistory(req.params.id);
    return reply.send({ data: history });
  });
}
