/**
 * GET /api/v1/quote — get best-price quote across all anchors for a corridor
 *
 * PSEUDOCODE:
 *   1. Validate query params: assetCode, amount, type (deposit|withdrawal), network?
 *   2. QuoteEngine.getQuotes(assetCode, amount, type) → fetch fees from all capable anchors
 *   3. Sort by total cost (feeFixed + amount * feePercent)
 *   4. Return ranked list: [{ anchorId, anchorName, fee, estimatedReceive, expiresAt }]
 */

import { FastifyInstance } from "fastify";
import { QuoteEngine } from "../../services/QuoteEngine";

export async function quoteRoutes(app: FastifyInstance) {
  const quoteEngine = new QuoteEngine();

  app.get("/", async (req, reply) => {
    // TODO: validate query params with zod
    // TODO: call quoteEngine.getQuotes(...)
    // TODO: return ranked quotes array
    return reply.send({ data: [] });
  });
}
