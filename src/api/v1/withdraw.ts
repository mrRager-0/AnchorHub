/**
 * POST /api/v1/withdraw         — initiate a withdrawal via best-price anchor
 * GET  /api/v1/withdraw/:id     — get withdrawal transaction status
 *
 * PSEUDOCODE (initiate):
 *   1. Validate body: assetCode, amount, destinationAccount, type (bank/cash/etc)
 *   2. QuoteEngine.bestWithdrawal(assetCode, amount) → select anchor
 *   3. Route to SEP6Orchestrator.initiateWithdrawal() or SEP24Orchestrator.initiateWithdrawal()
 *   4. Persist Transaction record
 *   5. Return { transactionId, anchorId, stellarMemo, anchorAccount }
 *
 * PSEUDOCODE (status):
 *   1. Lookup Transaction by id, verify apiKey ownership
 *   2. Return transaction with latest status
 */

import { FastifyInstance } from "fastify";
import { QuoteEngine } from "../../services/QuoteEngine";
import { SEP6Orchestrator } from "../../services/SEP6Orchestrator";
import { SEP24Orchestrator } from "../../services/SEP24Orchestrator";

export async function withdrawRoutes(app: FastifyInstance) {
  const quoteEngine = new QuoteEngine();
  const sep6 = new SEP6Orchestrator();
  const sep24 = new SEP24Orchestrator();

  // Initiate withdrawal
  app.post("/", async (req, reply) => {
    // TODO: validate body with zod schema
    // TODO: select best anchor via QuoteEngine
    // TODO: route to correct SEP orchestrator
    // TODO: persist transaction
    return reply.status(201).send({ data: { transactionId: "TODO", status: "PENDING" } });
  });

  // Get withdrawal status
  app.get<{ Params: { id: string } }>("/:id", async (req, reply) => {
    // TODO: fetch transaction, verify ownership, return status
    return reply.send({ data: {} });
  });
}
