import { describe, expect, it } from "vitest";

import { DisjointSet } from "../src/index.js";

describe("DisjointSet", () => {
  it("adds values idempotently and rejects unknown values", () => {
    const set = new DisjointSet<string>();
    set.add("a").add("a");
    expect(set.size).toBe(1);
    expect(set.has("a")).toBe(true);
    expect(set.has("b")).toBe(false);
    expect(() => set.find("b")).toThrow("Unknown");
  });

  it("unions by rank and detects existing connections", () => {
    const set = new DisjointSet<number>();
    [1, 2, 3, 4].forEach((value) => set.add(value));
    expect(set.union(1, 2)).toBe(true);
    expect(set.union(3, 4)).toBe(true);
    expect(set.union(1, 3)).toBe(true);
    expect(set.union(2, 4)).toBe(false);
    expect(set.connected(2, 4)).toBe(true);
    const groups = [...set.groups().values()];
    expect(Array.from(groups[0] as Set<number>)).toEqual([1, 2, 3, 4]);
  });

  it("attaches a lower-rank tree below a higher-rank tree", () => {
    const set = new DisjointSet<number>();
    [1, 2, 3, 4].forEach((value) => set.add(value));
    set.union(1, 2);
    set.union(1, 3);
    set.union(4, 1);
    expect(set.find(3)).toBe(set.find(1));
    expect(set.find(4)).toBe(set.find(1));
  });
});
