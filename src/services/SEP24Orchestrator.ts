/**
 * SEP24Orchestrator — SEP-24 (interactive) deposit/withdrawal lifecycle.
 *
 * PSEUDOCODE (initiateDeposit):
 *   1. POST to anchor's /transactions/deposit/interactive
 *   2. Receive { id, type: "interactive_customer_info_needed", url }
 *   3. Return { externalId, interactiveUrl } — client opens URL in browser/webview
 *
 * PSEUDOCODE (initiateWithdrawal):
 *   1. POST to anchor's /transactions/withdraw/interactive
 *   2. Return { externalId, interactiveUrl }
 *
 * PSEUDOCODE (pollStatus):
 *   1. GET /transactions?id=<externalId>
 *   2. Map SEP-24 status → TransactionStatus enum
 */

import { Anchor } from "@prisma/client";

export interface InteractiveResult {
  externalId: string;
  interactiveUrl: string;
}

export class SEP24Orchestrator {
  async initiateDeposit(anchor: Anchor, params: Record<string, unknown>): Promise<InteractiveResult> {
    // TODO: call anchor SEP-24 /transactions/deposit/interactive via SEPStack SDK
    throw new Error("Not implemented");
  }

  async initiateWithdrawal(anchor: Anchor, params: Record<string, unknown>): Promise<InteractiveResult> {
    // TODO: call anchor SEP-24 /transactions/withdraw/interactive via SEPStack SDK
    throw new Error("Not implemented");
  }

  async pollStatus(anchor: Anchor, externalId: string): Promise<string> {
    // TODO: GET /transactions?id=externalId, map to TransactionStatus
    throw new Error("Not implemented");
  }
}
