/**
 * Unit tests for AnchorRegistry
 *
 * PSEUDOCODE:
 *   - Mock Prisma
 *   - Test: list() returns only active anchors
 *   - Test: getById() returns null for unknown id
 *   - Test: getById() returns anchor with assets
 */

import { AnchorRegistry } from "../../src/services/AnchorRegistry";

jest.mock("@prisma/client");

describe("AnchorRegistry", () => {
  let registry: AnchorRegistry;

  beforeEach(() => {
    registry = new AnchorRegistry();
  });

  it("list returns active anchors", async () => {
    // TODO: mock prisma.anchor.findMany, assert isActive filter applied
    const result = await registry.list({});
    expect(Array.isArray(result)).toBe(true);
  });

  it("getById returns null for unknown id", async () => {
    // TODO: mock prisma.anchor.findUnique to return null
    const result = await registry.getById("nonexistent");
    expect(result).toBeNull();
  });
});
