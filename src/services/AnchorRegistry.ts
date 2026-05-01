/**
 * AnchorRegistry — anchor metadata & capability discovery.
 *
 * PSEUDOCODE (list):
 *   1. Build Prisma where clause from filters (network, assetCode, sep)
 *   2. Query anchors with assets included
 *   3. Return array
 *
 * PSEUDOCODE (getById):
 *   1. Prisma findUnique by id, include assets
 *   2. Return anchor or null
 *
 * PSEUDOCODE (refreshToml):
 *   1. Fetch https://<homeDomain>/.well-known/stellar.toml
 *   2. Parse TOML
 *   3. Update anchor.stellarToml in DB
 *   4. Sync supportedSeps and assets from TOML CURRENCIES section
 */

import { PrismaClient, Network } from "@prisma/client";

const prisma = new PrismaClient();

export interface AnchorFilters {
  network?: Network;
  assetCode?: string;
  sep?: number;
}

export class AnchorRegistry {
  async list(filters: AnchorFilters) {
    // TODO: build dynamic where clause from filters
    return prisma.anchor.findMany({
      where: { isActive: true },
      include: { assets: true },
    });
  }

  async getById(id: string) {
    return prisma.anchor.findUnique({
      where: { id },
      include: { assets: true },
    });
  }

  async refreshToml(anchorId: string) {
    // TODO: fetch stellar.toml, parse, update DB
    throw new Error("Not implemented");
  }
}
