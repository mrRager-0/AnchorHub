/**
 * Workers entrypoint — starts all BullMQ background workers.
 * Run via: pnpm workers
 */

import { startTxStatusPoller } from "./txStatusPoller";
import { startHealthChecker } from "./healthChecker";

async function main() {
  console.warn("[workers] Starting background workers...");
  startTxStatusPoller();
  await startHealthChecker();
  console.warn("[workers] All workers running.");
}

main().catch((err) => {
  console.error("[workers] Fatal error:", err);
  process.exit(1);
});
