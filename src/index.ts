/** Union-find with path compression and union by rank. */
export class DisjointSet<T> {
  private readonly parents = new Map<T, T>();
  private readonly ranks = new Map<T, number>();

  get size(): number {
    return this.parents.size;
  }

  add(value: T): this {
    if (!this.parents.has(value)) {
      this.parents.set(value, value);
      this.ranks.set(value, 0);
    }
    return this;
  }

  has(value: T): boolean {
    return this.parents.has(value);
  }

  find(value: T): T {
    if (!this.parents.has(value)) throw new Error("Unknown disjoint-set value");
    const parent = this.parents.get(value) as T;
    if (!Object.is(parent, value)) {
      const root = this.find(parent);
      this.parents.set(value, root);
      return root;
    }
    return value;
  }

  union(left: T, right: T): boolean {
    const leftRoot = this.find(left);
    const rightRoot = this.find(right);
    if (Object.is(leftRoot, rightRoot)) return false;
    const leftRank = this.ranks.get(leftRoot) as number;
    const rightRank = this.ranks.get(rightRoot) as number;
    if (leftRank < rightRank) {
      this.parents.set(leftRoot, rightRoot);
    } else {
      this.parents.set(rightRoot, leftRoot);
      if (leftRank === rightRank) this.ranks.set(leftRoot, leftRank + 1);
    }
    return true;
  }

  connected(left: T, right: T): boolean {
    return this.find(left) === this.find(right);
  }

  groups(): Map<T, Set<T>> {
    const groups = new Map<T, Set<T>>();
    for (const value of this.parents.keys()) {
      const root = this.find(value);
      const group = groups.get(root) ?? new Set<T>();
      group.add(value);
      groups.set(root, group);
    }
    return groups;
  }
}
