# AnchorHub API Reference

Base URL: `https://api.anchorhub.dev/api/v1`

All requests require `Authorization: Bearer <api_key>` except where noted.

---

## Anchors

### `GET /anchors`
List all active anchors.

**Query params:** `network` (mainnet|testnet), `assetCode`, `sep` (6|24|31)

**Response:**
```json
{ "data": [{ "id": "...", "name": "...", "homeDomain": "...", "supportedSeps": [6, 24], "assets": [] }] }
```

### `GET /anchors/:id`
Get anchor detail including supported assets.

### `GET /anchors/:id/info`
Fetch live parsed `stellar.toml` for the anchor.

---

## Quotes

### `GET /quote`
Get ranked fee quotes across all anchors for a corridor.

**Query params:** `assetCode` (required), `amount` (required), `type` (deposit|withdrawal)

**Response:**
```json
{ "data": [{ "anchorId": "...", "anchorName": "...", "fee": "0.60", "estimatedReceive": "99.40", "expiresAt": "..." }] }
```

---

## Deposits

### `POST /deposit`
Initiate a deposit. AnchorHub selects the best-price anchor automatically.

**Body:**
```json
{ "assetCode": "USDC", "amount": "100", "destinationAccount": "G...", "preferredAnchorId": null }
```

**Response:** `201`
```json
{ "data": { "transactionId": "...", "anchorId": "...", "status": "PENDING", "instructions": {} } }
```

### `GET /deposit/:id`
Get deposit transaction status.

---

## Withdrawals

### `POST /withdraw`
Initiate a withdrawal.

**Body:**
```json
{ "assetCode": "USDC", "amount": "100", "destinationAccount": "bank-account-details", "type": "bank_account" }
```

### `GET /withdraw/:id`
Get withdrawal transaction status.

---

## Health

### `GET /health` *(no auth required)*
AnchorHub service liveness check.

### `GET /health/anchors`
Per-anchor health summary (latest check per anchor).

### `GET /health/anchors/:id`
Health check history for a specific anchor.

---

## Transaction Statuses

| Status | Description |
|---|---|
| `PENDING` | Initiated, awaiting anchor confirmation |
| `PENDING_EXTERNAL` | Waiting for external action (e.g. bank transfer) |
| `PENDING_ANCHOR` | Anchor is processing |
| `PENDING_STELLAR` | Stellar transaction in flight |
| `COMPLETED` | Successfully completed |
| `REFUNDED` | Funds returned to sender |
| `ERROR` | Terminal error |
