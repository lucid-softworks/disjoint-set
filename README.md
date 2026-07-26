# `@lucid-softworks/disjoint-set`

A typed union-find data structure using path compression and union by rank.

```ts
import { DisjointSet } from "@lucid-softworks/disjoint-set";

const components = new DisjointSet(["a", "b"]);
```

Add values with `add`, connect them with `union`, query with `find` or
`connected`, and materialize all components with `groups`.
