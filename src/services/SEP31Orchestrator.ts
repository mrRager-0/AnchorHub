/**
 * SEP31Orchestrator — SEP-31 cross-border transfer lifecycle.
 *
 * PSEUDOCODE (initiateTransfer):
 *   1. GET anchor's /info to confirm SEP-31 support and required fields
 *   2. POST to anchor's /transactions with { amount, asset_code, fields: { sender, receiver } }
 *   3. Receive { id, stellar_account_id, stellar_memo, stellar_memo_type }
 *   4. Return transfer instructions for the sending wallet
 *
 * PSEUDOCODE (pollStatus):
 *   1. GET /transactions/:id
 *   2. Map SEP-31 status → TransactionStatus enum
 */

import { Anchor } from "@prisma/client";

export interface TransferInstructions {
  externalId: string;
  stellarAccount: string;
  stellarMemo: string;
  stellarMemoType: string;
}

export class SEP31Orchestrator {
  async initiateTransfer(anchor: Anchor, params: Record<string, unknown>): Promise<TransferInstructions> {
    // TODO: call anchor SEP-31 /transactions endpoint via SEPStack SDK
    throw new Error("Not implemented");
  }

  async pollStatus(anchor: Anchor, externalId: string): Promise<string> {
    // TODO: GET /transactions/:id, map to TransactionStatus
    throw new Error("Not implemented");
  }
}
