# Search Algorithms

## State space

- **Initial state:** robot at `START`, `remaining = INITIAL_REMAINING`, `cargo = EMPTY_LOAD`, `g = 0`.
- **Actions:** move (4 directions), load (legal batches at warehouse), unload (at pavilion with matching cargo).
- **Goal test:** `all_zero(remaining)` and `all_zero(cargo)`.

Duplicate states are pruned: same `(x, y, remaining, cargo)` keeps only the lowest `g`.

## Cost `g(n)`

Each edge costs **1**:

- One move
- One load
- One unload

`g` is stored on each `GeneratedState` and `Node`.

## Heuristic `h(n)` (`heuristic.py`)

Manhattan distance on the grid (4-neighbor):

```python
def heuristic(pos, remaining, cargo, item_positions):
    if cargo empty:
        if remaining empty: return 0      # goal
        else: return manhattan(pos, WAREHOUSE)  # must load again
    else:
        return min distance from pos to any pavilion position for cargo being carried
```

Intuition:

- Empty robot with work left → go to warehouse.
- Carrying bouquets → go toward nearest delivery cell.

Used in `declare_generated` for `f = g + h` and in `search.py` for frontier priority.

## A\* (`solve_astar` / `solve("astar")`)

```python
f(n) = g(n) + h(n)
```

Algorithm (`search.py`):

1. Push start state on frontier with `f = h(start)`.
2. Pop state with **minimum** `(f, serial)` (tie-break by insertion order).
3. Skip if stale (`g` worse than best known for this state key).
4. If goal → return `Result`.
5. Call `expand_state` → add successors with better `g` to frontier.
6. Repeat until frontier empty.

**Basic test result:** optimal cost **28** (28 operations).

## DFS (`solve_dfs` / `solve("dfs")`)

Same expansion rules; frontier pop takes the **last** element (LIFO).

- Explores deeply before backtracking.
- Does **not** guarantee optimal cost.
- **Basic test:** cost ~58–68 (varies with tie-breaking).

Compares with assignment note: Experta default **Recency** ≈ depth-first rule firing; our DFS uses the same successors with stack-ordered frontier.

## Generated search tree

`Result.generated` is a tuple of strings, one per **accepted** successor enqueued (plus start line). Example:

```
g=0 h=2 f=2 pos=(2, 3) cargo=(0,0,...) remaining=(2,1,1,...)
```

Basic scenario: ~45,000 lines (full tree is large because step-by-step moves branch heavily).

Console prints first 40 lines; full list is in memory and partially exported to the UI (`generated` field, capped in `ui_export.py`).

## Example optimal path (basic data)

Abbreviated trip structure:

1. Move to warehouse → load Rose batch for Pavilion 1
2. Deliver to Pavilion 1 → return to warehouse
3. Load Goliat Rose → deliver to Pavilion 4
4. Load Tulip → deliver to Pavilion 2
5. Load Orchid → deliver to Pavilion 3

Total: **28 steps**, **4 load/unload cycles**.

## Performance notes

- Each expansion runs a full Experta `kb.run()` — correct for the assignment but slow on large grids.
- `test_data.json` (7×6) takes significantly longer than `test_data.basic.json`.
- For demos, keep `DATA_FILE = "test_data.basic.json"` in `domain.py`.

## Key functions

| Function | File | Role |
|----------|------|------|
| `start_search(mode)` | search.py | Main loop |
| `expand_state(...)` | rules.py | Experta successor generation |
| `heuristic(...)` | heuristic.py | `h(n)` |
| `state_key(...)` | search.py | Duplicate detection |
| `solve_astar()` | search.py | Public API for optimal solve |
