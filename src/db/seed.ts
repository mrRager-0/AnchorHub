/**
 * Seed file — populates the anchor registry with known SEP-compliant anchors.
 *
 * PSEUDOCODE:
 *   1. Connect Prisma client
 *   2. For each anchor definition in SEED_ANCHORS:
 *      a. Upsert Anchor record by homeDomain
 *      b. Upsert AnchorAsset records for each supported asset
 *   3. Disconnect
 */

import { PrismaClient, Network } from "@prisma/client";

const prisma = new PrismaClient();

const SEED_ANCHORS = [
  {
    name: "SDF Test Anchor",
    homeDomain: "testanchor.stellar.org",
    network: Network.TESTNET,
    supportedSeps: [6, 24, 31],
    assets: [
      {
        assetCode: "USDC",
        issuer: "GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5",
        depositMin: 1,
        depositMax: 10000,
        withdrawMin: 1,
        withdrawMax: 10000,
        feeFixed: 0.5,
        feePercent: 0.1,
      },
    ],
  },
  // TODO: add mainnet anchors (MoneyGram, Bitso, etc.) once registry YAML is parsed
];

async function main() {
  console.warn(`Seeding ${SEED_ANCHORS.length} anchors...`);

  for (const def of SEED_ANCHORS) {
    const anchor = await prisma.anchor.upsert({
      where: { homeDomain: def.homeDomain },
      update: { name: def.name, supportedSeps: def.supportedSeps },
      create: {
        name: def.name,
        homeDomain: def.homeDomain,
        network: def.network,
        supportedSeps: def.supportedSeps,
      },
    });

    for (const asset of def.assets) {
      await prisma.anchorAsset.upsert({
        where: { anchorId_assetCode: { anchorId: anchor.id, assetCode: asset.assetCode } },
        update: asset,
        create: { anchorId: anchor.id, ...asset },
      });
    }

    console.warn(`  ✓ ${anchor.name} (${anchor.homeDomain})`);
  }

  console.warn("Seed complete.");
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
