/**
 * QuoteEngine — fee comparison & corridor routing.
 *
 * PSEUDOCODE (getQuotes):
 *   1. Query all active anchors supporting assetCode + type (deposit/withdrawal)
 *   2. For each anchor, compute totalFee = feeFixed + amount * (feePercent / 100)
 *   3. Sort ascending by totalFee
 *   4. Return ranked QuoteResult[]
 *
 * PSEUDOCODE (bestDeposit / bestWithdrawal):
 *   1. Call getQuotes(...)
 *   2. Return first result (lowest fee)
 *   3. If no anchors available → throw NoAnchorAvailableError
 */

import { PrismaClient } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

const prisma = new PrismaClient();

export type QuoteType = "deposit" | "withdrawal";

export interface QuoteResult {
  anchorId: string;
  anchorName: string;
  fee: Decimal;
  estimatedReceive: Decimal;
  expiresAt: Date;
}

export class QuoteEngine {
  async getQuotes(assetCode: string, amount: Decimal, type: QuoteType): Promise<QuoteResult[]> {
    // TODO: query anchors with matching asset, compute fees, sort, return
    return [];
  }

  async bestDeposit(assetCode: string, amount: Decimal): Promise<QuoteResult> {
    const quotes = await this.getQuotes(assetCode, amount, "deposit");
    if (!quotes.length) throw new Error("No anchor available for this corridor");
    return quotes[0];
  }

  async bestWithdrawal(assetCode: string, amount: Decimal): Promise<QuoteResult> {
    const quotes = await this.getQuotes(assetCode, amount, "withdrawal");
    if (!quotes.length) throw new Error("No anchor available for this corridor");
    return quotes[0];
  }
}
