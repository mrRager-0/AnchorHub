/**
 * GET  /api/v1/anchors          — list all active anchors
 * GET  /api/v1/anchors/:id      — get anchor detail + assets
 * GET  /api/v1/anchors/:id/info — fetch live stellar.toml info
 *
 * PSEUDOCODE (list):
 *   1. Parse query params: network, assetCode, sep
 *   2. Query AnchorRegistry.list(filters)
 *   3. Return paginated anchor array
 *
 * PSEUDOCODE (detail):
 *   1. Lookup anchor by id via AnchorRegistry.getById(id)
 *   2. If not found → 404
 *   3. Return anchor + assets
 *
 * PSEUDOCODE (info):
 *   1. Fetch live stellar.toml from anchor's homeDomain
 *   2. Cache result in DB (anchor.stellarToml)
 *   3. Return parsed toml
 */

import { FastifyInstance } from "fastify";
import { AnchorRegistry } from "../../services/AnchorRegistry";

export async function anchorsRoutes(app: FastifyInstance) {
  const registry = new AnchorRegistry();

  // List anchors with optional filters
  app.get("/", async (req, reply) => {
    // TODO: parse & validate query params (network, assetCode, sep)
    const anchors = await registry.list({});
    return reply.send({ data: anchors });
  });

  // Get single anchor
  app.get<{ Params: { id: string } }>("/:id", async (req, reply) => {
    const anchor = await registry.getById(req.params.id);
    if (!anchor) return reply.status(404).send({ error: "Anchor not found" });
    return reply.send({ data: anchor });
  });

  // Fetch live stellar.toml info
  app.get<{ Params: { id: string } }>("/:id/info", async (req, reply) => {
    // TODO: fetch & parse https://<homeDomain>/.well-known/stellar.toml
    // TODO: update anchor.stellarToml cache in DB
    return reply.send({ data: {} });
  });
}
