/**
 * healthChecker — BullMQ repeatable worker that probes all active anchors.
 *
 * PSEUDOCODE:
 *   1. On startup, register repeatable job on queue "health-check"
 *      with repeat interval = HEALTH_CHECK_INTERVAL_MS
 *   2. For each job execution:
 *      a. Fetch all active anchors from DB
 *      b. For each anchor (in parallel, bounded concurrency):
 *         - Call HealthMonitor.checkAnchor(anchorId)
 *      c. Log summary: N healthy, M unhealthy
 *   3. On worker error → log, do not crash process
 */

import { Worker, Queue } from "bullmq";
import IORedis from "ioredis";
import { HealthMonitor } from "../services/HealthMonitor";
import { PrismaClient } from "@prisma/client";

const connection = new IORedis(process.env.REDIS_URL ?? "redis://localhost:6379", {
  maxRetriesPerRequest: null,
});

const prisma = new PrismaClient();
const monitor = new HealthMonitor();

export const healthCheckQueue = new Queue("health-check", { connection });

export async function startHealthChecker() {
  const interval = Number(process.env.HEALTH_CHECK_INTERVAL_MS ?? 60_000);

  // Register repeatable job
  await healthCheckQueue.add("run", {}, { repeat: { every: interval } });

  const worker = new Worker(
    "health-check",
    async () => {
      const anchors = await prisma.anchor.findMany({ where: { isActive: true } });

      // TODO: run checks with bounded concurrency (p-limit)
      await Promise.allSettled(anchors.map((a) => monitor.checkAnchor(a.id)));

      console.warn(`[healthChecker] checked ${anchors.length} anchors`);
    },
    { connection }
  );

  worker.on("failed", (_job, err) => {
    console.error("[healthChecker] job failed:", err.message);
  });

  return worker;
}
