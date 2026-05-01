/**
 * POST /api/v1/deposit          — initiate a deposit via best-price anchor
 * GET  /api/v1/deposit/:id      — get deposit transaction status
 *
 * PSEUDOCODE (initiate):
 *   1. Validate body: assetCode, amount, destinationAccount, preferredAnchorId?
 *   2. If no preferredAnchorId → call QuoteEngine.bestDeposit(assetCode, amount)
 *   3. Select SEP variant from anchor capabilities (SEP-6 or SEP-24)
 *   4. Delegate to SEP6Orchestrator.initiateDeposit() or SEP24Orchestrator.initiateDeposit()
 *   5. Persist Transaction record
 *   6. Return { transactionId, anchorId, instructions }
 *
 * PSEUDOCODE (status):
 *   1. Lookup Transaction by id, verify apiKey ownership
 *   2. If not found → 404
 *   3. Return transaction with latest status
 */

import { FastifyInstance } from "fastify";
import { QuoteEngine } from "../../services/QuoteEngine";
import { SEP6Orchestrator } from "../../services/SEP6Orchestrator";
import { SEP24Orchestrator } from "../../services/SEP24Orchestrator";

export async function depositRoutes(app: FastifyInstance) {
  const quoteEngine = new QuoteEngine();
  const sep6 = new SEP6Orchestrator();
  const sep24 = new SEP24Orchestrator();

  // Initiate deposit
  app.post("/", async (req, reply) => {
    // TODO: validate body with zod schema
    // TODO: select best anchor via QuoteEngine if none specified
    // TODO: route to correct SEP orchestrator
    // TODO: persist transaction
    return reply.status(201).send({ data: { transactionId: "TODO", status: "PENDING" } });
  });

  // Get deposit status
  app.get<{ Params: { id: string } }>("/:id", async (req, reply) => {
    // TODO: fetch transaction, verify ownership, return status
    return reply.send({ data: {} });
  });
}
