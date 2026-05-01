# Corridor Guide

A **corridor** is a (asset, region, direction) tuple — e.g. "USDC deposit in Mexico".

## How AnchorHub Routes Corridors

1. **Asset matching** — only anchors supporting the requested `assetCode` are considered
2. **Direction** — deposit vs withdrawal capability checked per anchor
3. **Fee ranking** — `totalFee = feeFixed + amount × (feePercent / 100)`, sorted ascending
4. **Health filter** — anchors with open circuit breakers are excluded
5. **Network** — mainnet/testnet anchors are never mixed

## Supported Assets (Testnet)

| Asset | Issuer |
|---|---|
| USDC | `GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5` |

## Supported Assets (Mainnet)

> Populated from `src/registry/mainnet/*.yaml` — see [Anchor Registration Guide](anchor-registration.md).

## Geo-Aware Routing (Roadmap)

Future versions will factor in the user's region to prefer anchors with local banking rails, reducing settlement time and FX spread.
