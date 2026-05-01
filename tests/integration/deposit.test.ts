/**
 * Integration tests for POST /api/v1/deposit
 *
 * PSEUDOCODE:
 *   - Build Fastify app in test mode
 *   - Inject valid API key header
 *   - Test: 201 with transactionId on valid body
 *   - Test: 400 on missing required fields
 *   - Test: 401 without API key
 *
 * Requires: running Postgres + Redis (or use testcontainers)
 */

// TODO: import buildApp from test helper once implemented
// TODO: import mock anchor server fixture

describe("POST /api/v1/deposit", () => {
  it.todo("returns 201 with transactionId for valid deposit request");
  it.todo("returns 400 when assetCode is missing");
  it.todo("returns 401 when Authorization header is absent");
  it.todo("routes to lowest-fee anchor when no preferredAnchorId given");
});
