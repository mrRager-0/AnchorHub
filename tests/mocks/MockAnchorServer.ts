/**
 * Mock Anchor Server — simulates a SEP-6/24/31 compliant anchor API.
 * Used in integration tests to avoid hitting mainnet/testnet.
 *
 * PSEUDOCODE:
 *   1. Start a Fastify server on a random port
 *   2. Serve /.well-known/stellar.toml with test CURRENCIES
 *   3. Serve SEP-6 endpoints: GET /info, POST /deposit, POST /withdraw, GET /transaction
 *   4. Serve SEP-24 endpoints: POST /transactions/deposit/interactive, GET /transactions
 *   5. Serve SEP-31 endpoints: GET /info, POST /transactions, GET /transactions/:id
 *   6. Expose start() / stop() / setNextStatus() for test control
 */

import Fastify, { FastifyInstance } from "fastify";

const MOCK_ASSET_CODE = "USDC";
const MOCK_ISSUER = "GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5";

export class MockAnchorServer {
  private app: FastifyInstance;
  private nextStatus = "pending_external";
  public baseUrl = "";

  constructor() {
    this.app = Fastify({ logger: false });
    this.registerRoutes();
  }

  private registerRoutes() {
    // stellar.toml
    this.app.get("/.well-known/stellar.toml", async () => {
      return `
TRANSFER_SERVER="http://localhost"
[CURRENCIES]
[[CURRENCIES]]
code="${MOCK_ASSET_CODE}"
issuer="${MOCK_ISSUER}"
      `.trim();
    });

    // SEP-6 info
    this.app.get("/info", async () => ({
      deposit: { [MOCK_ASSET_CODE]: { enabled: true, fee_fixed: 0.5, fee_percent: 0.1, min_amount: 1, max_amount: 10000 } },
      withdraw: { [MOCK_ASSET_CODE]: { enabled: true, fee_fixed: 0.5, fee_percent: 0.1 } },
    }));

    // SEP-6 deposit
    this.app.post("/deposit", async () => ({
      how: "Send funds to test bank account",
      id: "mock-tx-001",
      eta: 300,
      fee_fixed: 0.5,
      fee_percent: 0.1,
    }));

    // SEP-6 withdraw
    this.app.post("/withdraw", async () => ({
      id: "mock-tx-002",
      account_id: "GABC123",
      memo_type: "text",
      memo: "MOCK_MEMO",
    }));

    // SEP-6 transaction status
    this.app.get<{ Querystring: { id: string } }>("/transaction", async (req) => ({
      transaction: { id: req.query.id, status: this.nextStatus },
    }));
  }

  async start(): Promise<void> {
    await this.app.listen({ port: 0, host: "127.0.0.1" });
    const addr = this.app.server.address() as { port: number };
    this.baseUrl = `http://127.0.0.1:${addr.port}`;
  }

  async stop(): Promise<void> {
    await this.app.close();
  }

  setNextStatus(status: string) {
    this.nextStatus = status;
  }
}
