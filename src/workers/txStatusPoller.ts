/**
 * txStatusPoller — BullMQ worker that polls anchor transaction statuses.
 *
 * PSEUDOCODE:
 *   1. On startup, register BullMQ Worker for queue "tx-status-poll"
 *   2. For each job { transactionId }:
 *      a. Load Transaction + Anchor from DB
 *      b. Route to correct SEP orchestrator based on transaction.sep
 *      c. Call orchestrator.pollStatus(anchor, externalId)
 *      d. If status changed → update Transaction.status in DB
 *      e. If status changed → enqueue WebhookDispatcher job
 *      f. If terminal status (COMPLETED/REFUNDED/ERROR) → do not re-enqueue
 *      g. Otherwise → re-enqueue with delay = ANCHOR_POLL_INTERVAL_MS
 *   3. On worker error → log, increment failure counter
 */

import { Worker, Queue } from "bullmq";
import IORedis from "ioredis";

const connection = new IORedis(process.env.REDIS_URL ?? "redis://localhost:6379", {
  maxRetriesPerRequest: null,
});

export const txStatusQueue = new Queue("tx-status-poll", { connection });

const TERMINAL_STATUSES = new Set(["COMPLETED", "REFUNDED", "EXPIRED", "ERROR"]);

export function startTxStatusPoller() {
  const worker = new Worker(
    "tx-status-poll",
    async (job) => {
      const { transactionId } = job.data as { transactionId: string };

      // TODO: load transaction from DB
      // TODO: route to SEP6/24/31Orchestrator.pollStatus()
      // TODO: if status changed → update DB + enqueue webhook
      // TODO: if not terminal → re-enqueue with delay

      console.warn(`[txStatusPoller] polled tx ${transactionId}`);
    },
    { connection }
  );

  worker.on("failed", (job, err) => {
    console.error(`[txStatusPoller] job ${job?.id} failed:`, err.message);
  });

  return worker;
}
