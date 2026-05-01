# 🌐 AnchorHub

> **The unified Anchor Aggregator API for Stellar — one integration to access every compliant fiat on/off-ramp on the network.**

[![Build Status](https://img.shields.io/github/actions/workflow/status/stellar-oss/anchorhub/ci.yml?branch=main&style=flat-square&logo=github)](https://github.com/stellar-oss/anchorhub/actions)
[![License: Apache 2.0](https://img.shields.io/badge/License-Apache%202.0-blue?style=flat-square)](LICENSE)
[![Version](https://img.shields.io/github/v/release/stellar-oss/anchorhub?style=flat-square)](https://github.com/stellar-oss/anchorhub/releases)
[![SEP Compliant](https://img.shields.io/badge/SEP--6%20%7C%20SEP--24%20%7C%20SEP--31-compliant-success?style=flat-square)](https://stellar.org/ecosystem/sep)
[![Coverage](https://img.shields.io/codecov/c/github/stellar-oss/anchorhub?style=flat-square)](https://codecov.io/gh/stellar-oss/anchorhub)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?style=flat-square)](CONTRIBUTING.md)
[![Status: Beta](https://img.shields.io/badge/Status-Beta-orange?style=flat-square)]()

---

## 📖 Overview

**AnchorHub** is the "Stripe for Stellar" — a developer-first Anchor Aggregator API that abstracts the complexity of integrating with dozens of individual Stellar anchors behind a single, consistent REST interface. Instead of writing bespoke integrations for each anchor's quirks, rate structures, and SEP compliance variants, developers connect once to AnchorHub and gain instant access to the entire Stellar anchor network.

AnchorHub handles anchor discovery, capability negotiation, fee comparison, SEP-6 / SEP-24 / SEP-31 orchestration, and transaction lifecycle management — enabling any fintech, wallet, or exchange to offer best-price fiat ramps without the integration overhead.

---

## ✨ Key Features

- 🔌 **One API, All Anchors** — Unified REST interface aggregating all SEP-compliant anchors on Stellar mainnet and testnet
- 💸 **Smart Fee Routing** — Automatically selects the lowest-fee anchor for a given corridor (currency pair + region)
- 🔄 **SEP-6, SEP-24, SEP-31 Orchestration** — Full protocol lifecycle management: quotes, deposits, withdrawals, transfers
- 📊 **Anchor Health Dashboard** — Real-time uptime, success rates, and latency monitoring per anchor
- 🔑 **Unified Auth** — Single API key replaces anchor-by-anchor credential management
- 📡 **Webhooks** — Push notifications for transaction state changes across all anchors
- 🌍 **Corridor Intelligence** — Geo-aware routing for optimal regional anchor selection
- 🧱 **Pluggable Anchor Registry** — Open registry for community anchors; anchors submit via PR
- 🛡 **Rate Limiting & Circuit Breakers** — Automatic failover when an anchor becomes unavailable

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| API Server | Node.js · TypeScript · Fastify |
| Anchor Orchestration | SEPStack SDK (internal) |
| Database | PostgreSQL · Prisma ORM |
| Cache / Queue | Redis · BullMQ |
| Authentication | JWT · API Keys (hashed via Argon2) |
| Stellar Integration | `@stellar/stellar-sdk` · Horizon API |
| Monitoring | Prometheus · Grafana |
| CI/CD | GitHub Actions |
| Deployment | Docker · Kubernetes · Helm |

---

## 🗂 Project Structure

```
anchorhub/
│
├── src/
│   ├── api/                        # Fastify route handlers
│   │   ├── v1/
│   │   │   ├── anchors.ts          # Anchor discovery & info endpoints
│   │   │   ├── deposit.ts          # Deposit initiation & status
│   │   │   ├── withdraw.ts         # Withdrawal initiation & status
│   │   │   ├── quote.ts            # Best-price quote engine
│   │   │   └── health.ts           # Anchor health metrics
│   │   └── middleware/
│   │       ├── auth.ts             # API key validation
│   │       ├── rateLimit.ts        # Per-key rate limiting
│   │       └── errorHandler.ts
│   │
│   ├── services/
│   │   ├── AnchorRegistry.ts       # Anchor metadata & capability discovery
│   │   ├── QuoteEngine.ts          # Fee comparison & corridor routing
│   │   ├── SEP6Orchestrator.ts     # SEP-6 lifecycle manager
│   │   ├── SEP24Orchestrator.ts    # SEP-24 lifecycle manager
│   │   ├── SEP31Orchestrator.ts    # SEP-31 cross-border transfer manager
│   │   ├── WebhookDispatcher.ts    # Outbound webhook delivery
│   │   └── HealthMonitor.ts        # Anchor uptime polling
│   │
│   ├── db/
│   │   ├── migrations/             # Prisma migration files
│   │   ├── schema.prisma           # Database schema
│   │   └── seed.ts                 # Anchor registry seed data
│   │
│   ├── workers/                    # BullMQ background jobs
│   │   ├── txStatusPoller.ts       # Poll anchor transaction statuses
│   │   └── healthChecker.ts        # Periodic anchor health checks
│   │
│   ├── registry/                   # Community anchor definitions (YAML)
│   │   ├── mainnet/
│   │   └── testnet/
│   │
│   └── index.ts                    # Application entrypoint
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── mocks/                      # Mock anchor servers for testing
│
├── docs/
│   ├── api-reference.md
│   ├── anchor-registration.md
│   └── corridor-guide.md
│
├── deploy/
│   ├── helm/                       # Kubernetes Helm chart
│   └── docker-compose.yml
│
├── .env.example
├── Dockerfile
└── README.md
```

---

## 🏗 Architecture Overview

```
┌──────────────────────────────────────────┐
│          Client Application              │  ← Wallet / Exchange / dApp
└───────────────────┬──────────────────────┘
                    │ REST API (v1)
┌───────────────────▼──────────────────────┐
│              AnchorHub API               │
│  ┌──────────────┐  ┌───────────────────┐ │
│  │ Quote Engine │  │  SEP Orchestrator │ │
│  └──────────────┘  └───────────────────┘ │
│  ┌──────────────┐  ┌───────────────────┐ │
│  │Anchor Registry│ │  Health Monitor   │ │
│  └──────────────┘  └───────────────────┘ │
└───────┬────────────────────┬─────────────┘
        │                    │ Horizon / SEP API calls
┌───────▼──────┐    ┌────────▼────────────┐
│  PostgreSQL  │    │  Anchor Network      │
│  + Redis     │    │  (SEP-6/24/31 APIs) │
└──────────────┘    └─────────────────────┘
```

AnchorHub acts as a smart proxy and orchestration layer. It never holds user funds — it routes, monitors, and reports on transactions that occur directly between users and anchors on the Stellar network.

---

## 🔗 Inter-Project Dependencies

| Dependency | Type | Repository | Notes |
|---|---|---|---|
| `SEPStack` | Internal | `stellar-oss/sepstack` | Core SEP protocol SDK used for all anchor communication |
| `FiatFlow Widget` | Internal | `stellar-oss/fiatflow-widget` | UI widget that consumes AnchorHub API for on/off-ramps |
| `AnchorForge` | Internal | `stellar-oss/anchorforge` | AnchorForge-built anchors auto-register with AnchorHub |
| `StellarEscrow Protocol` | Internal | `stellar-oss/stellar-escrow-protocol` | Escrow release can trigger AnchorHub withdrawal |
| `@stellar/stellar-sdk` | External | npm | Stellar network interaction |

---

## ✅ Prerequisites

- **Node.js** `>= 20.x`
- **pnpm** `>= 9.x`
- **PostgreSQL** `>= 15`
- **Redis** `>= 7.x`
- **Docker** (recommended for local development)

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/stellar-oss/anchorhub.git
cd anchorhub
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Configure Environment

```bash
cp .env.example .env
# Edit .env with your configuration
```

### 4. Start Infrastructure (Docker)

```bash
docker-compose up -d postgres redis
```

### 5. Run Database Migrations

```bash
pnpm db:migrate
pnpm db:seed          # Seeds initial anchor registry
```

### 6. Start Development Server

```bash
pnpm dev
```

API will be available at `http://localhost:3000/api/v1`.

---

## 🔑 Environment Variables

| Variable | Required | Default | Description |
|---|---|---|---|
| `DATABASE_URL` | ✅ | — | PostgreSQL connection string |
| `REDIS_URL` | ✅ | — | Redis connection string |
| `STELLAR_NETWORK` | ✅ | `testnet` | `testnet` or `mainnet` |
| `HORIZON_URL` | ✅ | — | Horizon API endpoint |
| `API_KEY_SALT` | ✅ | — | Salt for API key hashing (min 32 chars) |
| `JWT_SECRET` | ✅ | — | JWT signing secret |
| `WEBHOOK_SIGNING_SECRET` | ✅ | — | HMAC secret for webhook signatures |
| `PORT` | ⬜ | `3000` | HTTP server port |
| `LOG_LEVEL` | ⬜ | `info` | Logging verbosity |
| `ANCHOR_POLL_INTERVAL_MS` | ⬜ | `30000` | How often to poll anchor tx status |
| `HEALTH_CHECK_INTERVAL_MS` | ⬜ | `60000` | Anchor health check interval |

---

## ▶️ Running the Project

```bash
# Development (hot reload)
pnpm dev

# Production build
pnpm build
pnpm start

# Run background workers only
pnpm workers
```

---

## 📜 Available Scripts

| Script | Command | Description |
|---|---|---|
| `dev` | `pnpm dev` | Start API in dev mode with hot reload |
| `build` | `pnpm build` | Compile TypeScript |
| `start` | `pnpm start` | Start compiled production server |
| `workers` | `pnpm workers` | Start BullMQ background workers |
| `test` | `pnpm test` | Run Jest test suite |
| `test:coverage` | `pnpm test:coverage` | Run tests with coverage report |
| `db:migrate` | `pnpm db:migrate` | Run Prisma migrations |
| `db:seed` | `pnpm db:seed` | Seed anchor registry |
| `db:studio` | `pnpm db:studio` | Open Prisma Studio |
| `lint` | `pnpm lint` | Run ESLint |
| `typecheck` | `pnpm typecheck` | Run TypeScript type checking |

---

## 🧪 Testing

```bash
# Full test suite
pnpm test

# Unit tests only
pnpm test:unit

# Integration tests (requires running Postgres + Redis)
pnpm test:integration

# Coverage report
pnpm test:coverage
```

Integration tests use mock anchor servers (see `tests/mocks/`) that simulate real SEP-6/24/31 anchor APIs without hitting mainnet.

---

## 🚢 Deployment

### Docker

```bash
docker build -t anchorhub .
docker run -d --env-file .env -p 3000:3000 anchorhub
```

### Docker Compose (Full Stack)

```bash
docker-compose up -d
```

### Kubernetes (Helm)

```bash
helm install anchorhub deploy/helm/ \
  --namespace stellar \
  --set image.tag=latest \
  --values deploy/helm/values.prod.yaml
```

---

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). To register a new anchor in the community registry, follow the [Anchor Registration Guide](docs/anchor-registration.md) and submit a PR to `src/registry/`.

---

## 📋 Code of Conduct

This project adheres to the [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). Report issues to **conduct@stellar-oss.dev**.

---

## 📄 License

Licensed under the **Apache License 2.0** — see [LICENSE](LICENSE).

> **Why Apache 2.0?** AnchorHub is infrastructure middleware meant to be freely embedded in commercial wallets and fintech products. Apache 2.0's patent grant and permissive terms make it the standard choice for protocol-layer OSS.

---

## 👥 Authors & Maintainers

| Name | Role | GitHub |
|---|---|---|
| Stellar OSS Core Team | Lead Maintainers | [@stellar-oss](https://github.com/stellar-oss) |

---

## 🙏 Acknowledgments

- [Stellar Development Foundation](https://stellar.org) — SEP standards and Horizon API
- [MoneyGram Access](https://stellar.org/blog/moneygram-access) — Inspiration for anchor aggregation patterns
- Community anchor operators across the Stellar network

---

## 🗺 Roadmap

- [ ] **v1.0** — Full SEP-6/24/31 support, 10+ anchors in registry
- [ ] **v1.1** — GraphQL API alongside REST
- [ ] **v1.2** — Anchor analytics dashboard UI
- [ ] **v1.3** — Dynamic fee alerts & best-price notifications
- [ ] **v2.0** — Streaming quotes via WebSocket

---

## 📝 Changelog

See [CHANGELOG.md](CHANGELOG.md).

---

## 💬 Support & Contact

- 📚 **Docs:** [docs.anchorhub.dev](https://docs.anchorhub.dev)
- 💬 **Discord:** [discord.gg/stellar-oss](https://discord.gg/stellar-oss)
- 🐛 **Issues:** [GitHub Issues](https://github.com/stellar-oss/anchorhub/issues)
- 📧 **Security:** security@stellar-oss.dev
