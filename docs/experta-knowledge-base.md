# Experta Knowledge Base

## Overview

The assignment requires modeling the problem as a **search tree** using **Experta** (`experta==1.9.4`). The engine class is `FlowerRobotKB` in `rules.py`.

## Facts (`facts.py`)

| Fact | Purpose |
|------|---------|
| `Grid` | `width`, `height` |
| `Warehouse` | `x`, `y` |
| `Robot` | `x`, `y`, `load` (summary load count) |
| `Pavilion` | `name`, `flower`, `x`, `y` |
| `Need` | `pavilion`, `flower`, `color`, `count` |
| `LoadBatch` | Precomputed legal batch: `total`, `same_flower`, `same_color`, `label` |
| `CurrentState` | Active state during expansion: `x`, `y`, `remaining`, `cargo`, `g`, `path` |
| `GeneratedState` | Successor: position, vectors, `g`, `h`, `f`, `path`, `action` |
| `TreeLine` | One printable line for the search tree |
| `Violation` | Constraint breach marker |
| `Goal` | Goal reached flag |
| `Solution` | Final `g` and `path` |
| `SearchConfig` | `mode` (`astar` / `dfs`) — metadata |

Strings encode tuples: `remaining="2,1,1,..."`, `path="move-right|load ..."`.

## Initial facts (`@DefFacts`)

Method `initial_facts` yields:

- Grid dimensions
- Warehouse and robot start
- All pavilions and needs
- All `LoadBatch` facts from `LOAD_CANDIDATES`
- Default `SearchConfig(mode="astar")`

Used when bootstrapping the KB; each **expansion** re-declares static facts plus one `CurrentState`.

## Generation rules (Requirement 2)

All read `CurrentState` and declare `GeneratedState` + `TreeLine`.

### Movement (`salience=40`)

| Rule | Condition | Effect |
|------|-----------|--------|
| `move_right` | `x < width` | `(x+1, y)`, `g+1`, append `move-right` |
| `move_left` | `x > 1` | `(x-1, y)` |
| `move_up` | `y < height` | `(x, y+1)` |
| `move_down` | `y > 1` | `(x, y-1)` |

Grid bounds are enforced in conditions (invalid moves are never generated).

### Loading (`salience=30`)

| Rule | Condition |
|------|-----------|
| `load_same_flower` | At warehouse, empty cargo, `LoadBatch` with `same_flower=True`, total ≤ max load, batch ≤ remaining |
| `load_same_color` | Same, but `same_color=True` and `same_flower=False` (avoids duplicate firing) |

Cargo becomes the batch; `remaining` unchanged until unload.

### Unloading (`salience=20`)

`unload_at_pavilion` — at a cell with matching cargo:

```python
amount = min(cargo, remaining) per item at this position
```

If `sum(amount) > 0`, subtract from `remaining` and `cargo`, `g+1`.

## Constraint rules (Requirement 3)

| Rule | Salience | Detects |
|------|----------|---------|
| `capacity_violation` | 100 | `LoadBatch.total > MAX_LOAD` |
| `load_shape_violation` | 100 | Neither same flower nor same color |

Move bounds are **prevented** in move rules rather than post-hoc violation facts. Invalid loads are filtered in load rule bodies via `valid_load()` and `leq_tuple()`.

## Goal and solution (Requirement 4)

| Rule | Salience | Action |
|------|----------|--------|
| `goal_reached` | 90 | When `remaining` and `cargo` all zero on a `GeneratedState` → `Goal`, `Solution` |
| `print_solution` | 80 | Emits `TreeLine` with `GOAL g=... path=...` |

The search driver in `search.py` also checks goal when popping from the frontier.

## Search tree printing (Requirement 5)

Every `declare_generated()` adds a `TreeLine` fact:

```
g=3 h=2 f=5 pos=(3, 2) cargo=(...) remaining=(...)
```

`search.py` accumulates these into `Result.generated` and `output.py` prints a sample.

DFS preview uses the same expansions but pops the **last** frontier entry (stack order), similar to depth-first / Recency-style exploration.

## Salience (Requirement 6)

Higher salience runs first when multiple rules match:

```
100 — constraint violations
 90 — goal detection
 80 — solution print
 40 — moves
 30 — load
 20 — unload
```

A\* **ordering** is implemented in `search.py` by sorting the frontier on `GeneratedState.f` (`g + h`). Rules compute `h` via `heuristic()` when declaring successors.

## `expand_state` API

```python
generated, tree_lines, solution = expand_state(x, y, remaining, cargo, g, path)
```

- Creates fresh `FlowerRobotKB`, declares world facts + `CurrentState`, runs `kb.run()`.
- Returns all `GeneratedState` facts as successors.

This is called once per expanded node in the search loop.

## Python 3.10 compatibility

At top of `rules.py`:

```python
import collections.abc
collections.Mapping = collections.abc.Mapping
```

Experta expects the old `collections.Mapping` name.
