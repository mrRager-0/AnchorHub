# Anchor Registration Guide

To register your anchor in the AnchorHub community registry, submit a PR adding a YAML file to `src/registry/mainnet/` or `src/registry/testnet/`.

## YAML Schema

```yaml
# src/registry/mainnet/your-anchor.yaml
name: "Your Anchor Name"
homeDomain: "yourdomain.com"
network: mainnet          # mainnet | testnet
supportedSeps: [6, 24]    # list of supported SEP numbers
contact: "ops@yourdomain.com"
assets:
  - code: USDC
    issuer: "G..."
    depositMin: 10
    depositMax: 50000
    withdrawMin: 10
    withdrawMax: 50000
```

## Requirements

1. Your anchor must serve a valid `/.well-known/stellar.toml`
2. All listed SEPs must be fully implemented and passing the [SEP compliance test suite](https://github.com/stellar/stellar-anchor-tests)
3. Uptime SLA of ≥ 99% over the past 30 days (verified by AnchorHub health monitor)
4. Contact email must be reachable for incident coordination

## Review Process

1. Fork the repo and add your YAML file
2. Open a PR — CI will run automated SEP compliance checks against your anchor
3. Maintainers review and merge
4. AnchorHub picks up the new anchor on next registry refresh (within 1 hour)
