/**
 * SEP6Orchestrator — SEP-6 (non-interactive) deposit/withdrawal lifecycle.
 *
 * PSEUDOCODE (initiateDeposit):
 *   1. Fetch anchor's SEP-6 /info endpoint to confirm asset support
 *   2. POST to anchor's /deposit with { asset_code, account, amount, ... }
 *   3. Handle response: { how, id, eta, fee_fixed, fee_percent, ... }
 *   4. Return { externalId, instructions }
 *
 * PSEUDOCODE (initiateWithdrawal):
 *   1. POST to anchor's /withdraw with { asset_code, type, dest, ... }
 *   2. Return { externalId, stellarMemo, anchorAccount }
 *
 * PSEUDOCODE (pollStatus):
 *   1. GET anchor's /transaction?id=<externalId>
 *   2. Map anchor status string → TransactionStatus enum
 *   3. Return mapped status
 */

import { Anchor } from "@prisma/client";

export interface DepositInstructions {
  externalId: string;
  how: string;
  eta?: number;
  feeFixed?: number;
  feePercent?: number;
}

export interface WithdrawalInstructions {
  externalId: string;
  stellarMemo: string;
  anchorAccount: string;
}

export class SEP6Orchestrator {
  async initiateDeposit(anchor: Anchor, params: Record<string, unknown>): Promise<DepositInstructions> {
    // TODO: call anchor SEP-6 /deposit endpoint via SEPStack SDK
    throw new Error("Not implemented");
  }

  async initiateWithdrawal(anchor: Anchor, params: Record<string, unknown>): Promise<WithdrawalInstructions> {
    // TODO: call anchor SEP-6 /withdraw endpoint via SEPStack SDK
    throw new Error("Not implemented");
  }

  async pollStatus(anchor: Anchor, externalId: string): Promise<string> {
    // TODO: GET /transaction?id=externalId, map to TransactionStatus
    throw new Error("Not implemented");
  }
}
