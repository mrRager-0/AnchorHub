/**
 * WebhookDispatcher — outbound webhook delivery with retry logic.
 *
 * PSEUDOCODE (dispatch):
 *   1. Build payload: { event, transactionId, status, timestamp }
 *   2. Sign payload with HMAC-SHA256 using WEBHOOK_SIGNING_SECRET
 *   3. POST to transaction.webhookUrl with signature header
 *   4. On success → update WebhookEvent.status = DELIVERED
 *   5. On failure → increment attempts, schedule retry with exponential backoff
 *   6. After MAX_ATTEMPTS → mark FAILED, emit alert
 *
 * PSEUDOCODE (scheduleRetry):
 *   1. Compute nextRetryAt = now + 2^attempts * BASE_DELAY_MS
 *   2. Update WebhookEvent.nextRetryAt
 *   3. BullMQ job picks up pending events on schedule
 */

import crypto from "crypto";

const MAX_ATTEMPTS = 5;
const BASE_DELAY_MS = 5_000;

export class WebhookDispatcher {
  async dispatch(webhookEventId: string): Promise<void> {
    // TODO: load WebhookEvent + Transaction from DB
    // TODO: sign payload, POST to webhookUrl
    // TODO: update status or schedule retry
    throw new Error("Not implemented");
  }

  private sign(payload: string): string {
    return crypto
      .createHmac("sha256", process.env.WEBHOOK_SIGNING_SECRET ?? "")
      .update(payload)
      .digest("hex");
  }

  private nextRetryDelay(attempts: number): number {
    return Math.min(BASE_DELAY_MS * Math.pow(2, attempts), 300_000); // cap at 5 min
  }
}
