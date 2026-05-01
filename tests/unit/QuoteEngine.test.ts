/**
 * Unit tests for QuoteEngine
 *
 * PSEUDOCODE:
 *   - Mock Prisma to return fixture anchors with assets
 *   - Test: getQuotes returns sorted results by fee
 *   - Test: bestDeposit returns lowest-fee anchor
 *   - Test: bestDeposit throws when no anchors available
 */

import { QuoteEngine } from "../../src/services/QuoteEngine";

jest.mock("@prisma/client");

describe("QuoteEngine", () => {
  let engine: QuoteEngine;

  beforeEach(() => {
    engine = new QuoteEngine();
  });

  it("returns empty array when no anchors support the asset", async () => {
    // TODO: mock prisma.anchor.findMany to return []
    const results = await engine.getQuotes("USDC", 100 as any, "deposit");
    expect(results).toEqual([]);
  });

  it("sorts quotes by ascending fee", async () => {
    // TODO: mock two anchors with different fees, assert order
  });

  it("bestDeposit throws when no quotes available", async () => {
    // TODO: mock empty result, assert throws
    await expect(engine.bestDeposit("USDC", 100 as any)).rejects.toThrow(
      "No anchor available"
    );
  });
});
