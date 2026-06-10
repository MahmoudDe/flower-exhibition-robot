# Problem Domain

## Story

A flower exhibition is laid out as a **grid**. A **warehouse** holds all bouquets. A **robot** must deliver bouquets to **pavilions**, each dedicated to one flower type and needing specific colors in given quantities.

The robot should satisfy all pavilion needs with **minimum total cost** (moves + loads + unloads).

## Entities

| Entity | Description |
|--------|-------------|
| **Grid** | `width × height` cells. Coordinates are `(x, y)` with `x` from 1 to width, `y` from 1 to height. |
| **Warehouse** | Fixed cell. Loading happens only here. |
| **Robot** | Starts at a given cell. Carries bouquets. Has a **max load** capacity. |
| **Pavilion** | Has position, flower type, and color → count needs. |
| **Bouquet** | One unit = `(flower type, color)` for a specific pavilion. |

## Movement

- One step per move: **up, down, left, right**.
- **Cost = 1** per move.
- Cannot leave the grid (bounds checked in move rules).

## Max load

```
max_load = max over pavilions of (sum of all color needs for that pavilion)
```

Example (basic test data): Pavilion 1 needs 2+1+1=4, Pavilion 2 needs 3+1=4, etc. → **max load = 4**.

## Loading (at warehouse only)

- Robot cargo must be **empty** before loading.
- One load operation per batch; **cost = 1**.
- Batch must respect **one** of:

| Mode | Rule | Example |
|------|------|---------|
| **Same flower** | One flower type, any colors (for that pavilion’s lines) | Rose red + Rose pink + Rose white |
| **Same color** | One color, different flower types | Rose red + Tulip red + Orchid red |

**Forbidden:** Mixed flower types **and** mixed colors in the same load.

Total bouquets in a load ≤ `max_load`.

## Unloading (at pavilion only)

- Only bouquets matching that pavilion’s **position and flower type** can be unloaded.
- **Partial unload:** If the robot carries at least what the pavilion still needs for items at that cell, it unloads the matching amounts (capped by cargo and remaining need).
- **Cost = 1** per unload (regardless of how many bouquets or colors).
- Same pavilion may be visited **multiple times** for different trips.
- Cannot unload wrong flower type at a pavilion.

## Goal state

- All pavilion needs satisfied (`remaining` counts are all zero).
- Robot carries **no** bouquets (`cargo` all zero).

## Cost function

```
g(n) = number of operations so far (moves + loads + unloads)
```

Each operation costs **1**. The assignment asks for the plan with **minimum** `g` at the goal → **A\*** search.

## State representation

A search state is fully described by:

```python
State(pos, remaining, cargo)
```

- `pos` — `(x, y)` robot cell
- `remaining` — tuple of counts still needed per bouquet line (same order as `ITEMS` in `domain.py`)
- `cargo` — tuple of counts currently on the robot per bouquet line

## Test data

| File | Grid | Pavilions | Use |
|------|------|-----------|-----|
| `test_data.basic.json` | 5×5 | 4 | Default; matches assignment-style example |
| `test_data.json` | 7×6 | 5 | Larger scenario |

Switch dataset in `domain.py`:

```python
DATA_FILE = "test_data.basic.json"  # or "test_data.json"
```

## Flower types (assignment)

| Type | Example colors |
|------|------------------|
| Rose | red, pink, white, yellow, burgundy |
| Tulip | red, yellow, purple, orange, green, violet, magenta |
| Orchid | purple, white, pink, fuchsia |
| Goliat Rose | gold, light pink, yellow, … |

Colors in JSON use English keys (e.g. `"light pink"`).
