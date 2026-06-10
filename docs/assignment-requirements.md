# Assignment Requirements — Mapping

This document maps the official assignment (معرض الورود الذكي – روبوت توزيع الباقات) to this implementation.

## Summary checklist

| # | Requirement | Status | Where |
|---|-------------|--------|-------|
| 1 | Initial state as facts | Done | `rules.py` → `initial_facts`, `expand_state` setup |
| 2 | Generate path rules (move, load, unload) | Done | `FlowerRobotKB` movement + load + unload rules |
| 3 | Constraint violation rules | Done | `capacity_violation`, `load_shape_violation`; bounds in move rules |
| 4 | Goal detection + print solution | Done | `goal_reached`, `print_solution`, `output.py` |
| 5 | Print search tree | Done | `TreeLine` facts, `Result.generated`, console + UI |
| 6 | A\* with `f(n)=g(n)+h(n)` and salience | Done | `GeneratedState.f`, `search.py` A\*, rule salience |

---

## 1. Initial state as facts

**Assignment:** Define grid, warehouse, robot position/load, pavilions, color needs.

**Implementation:**

- `@DefFacts def initial_facts` declares `Grid`, `Warehouse`, `Robot`, `Pavilion`, `Need`, `LoadBatch`.
- Data source: `test_data.basic.json` / `test_data.json` via `domain.py`.
- On each expansion, static world facts are re-declared with `CurrentState` for the active node.

---

## 2. Generate next-state rules

**Assignment:**

- `move-right`, `move-left`, `move-up`, `move-down`
- Load with constraints
- Unload (full/partial)

**Implementation:**

| Rule group | File | Notes |
|------------|------|-------|
| Four moves | `rules.py` | Cost +1, append to `path`, bounds in `TEST` |
| Load same flower | `load_same_flower` | Option B in assignment |
| Load same color | `load_same_color` | Option A in assignment |
| Unload | `unload_at_pavilion` | Partial unload via `unloadable_batch` |

Each success declares `GeneratedState` — a **new search tree node**, not only an annotation.

---

## 3. Constraint violation rules

**Assignment:**

- Exceed max load
- Illegal load pattern
- Unload at wrong pavilion
- Move outside grid

**Implementation:**

| Constraint | How handled |
|------------|-------------|
| Max load | `capacity_violation`; load rules also check `total <= MAX_LOAD` |
| Mixed flower + color | `load_shape_violation`; `valid_load()` in domain |
| Wrong pavilion unload | Only items at robot cell position are unloadable |
| Grid bounds | Move rules require `1 <= x <= width`, `1 <= y <= height` |

---

## 4. Find and print solution

**Assignment:** Goal rule + print operation sequence.

**Implementation:**

- Goal: all needs met, empty cargo (`goal_reached`).
- `Solution` fact stores `g` and encoded `path`.
- `output.py` prints numbered solution path and optimal cost.
- `ui_export.py` + `index.html` visual replay.

---

## 5. Print search tree

**Assignment:** Print all generated states; note Experta Recency ≈ DFS.

**Implementation:**

- `TreeLine` on every `declare_generated`.
- `search.py` collects lines into `Result.generated`.
- Console: first 40 states + total count.
- UI dock: sample of generated states.
- `solve_dfs()` demonstrates non-optimal depth-first order.

---

## 6. A\* with salience / priority

**Assignment:** Use salience; `f(n) = g(n) + h(n)`; prune search tree by cost.

**Implementation:**

- `g` — operation count on each state.
- `h` — `heuristic.py` (Manhattan-based).
- `f` — stored on `GeneratedState`; frontier picks minimum `f` in `search.py`.
- Rule **salience** orders constraint > goal > moves > load > unload when Experta runs.
- **Best-cost pruning:** `best` dict in `search.py` drops worse paths to the same state.

---

## Problem rules verified in code

| Rule | Verified |
|------|----------|
| Max load = max pavilion total demand | `compute_max_load()` in `domain.py` |
| Load only at warehouse, empty cargo | Load rule `TEST` + warehouse match |
| Same color OR same flower loads | `valid_batch()` / `LOAD_CANDIDATES` |
| Unload only matching pavilion | Position match in `unload_amount` |
| Partial unload allowed | `min(cargo, remaining)` per line |
| Multiple pavilion visits | Search can return to same cell |
| Goal: needs met + empty robot | `is_goal_fact` / `goal_reached` |
| Each operation cost = 1 | All successors use `g + 1` |

---

## Basic example results

Using `test_data.basic.json`:

| Metric | Value |
|--------|-------|
| Optimal cost (A\*) | 28 |
| DFS cost | ~58–68 |
| Generated states | ~45,000 |
| Max load | 4 |

---

## What to explain in the oral exam

1. Why `remaining` and `cargo` are tuples aligned with `ITEMS`.
2. How `LOAD_CANDIDATES` is built and why two load rules exist.
3. One walk-through of `expand_state` firing move + load rules at the warehouse.
4. Formula for `h(n)` and why A\* cost beats DFS.
5. Difference between Experta **salience** (rule priority) and A\* **frontier** (state priority).
