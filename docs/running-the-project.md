# Running the Project

## Prerequisites

- Python **3.10+**
- pip

## Install

```bash
cd FlowerRobot-KBSProject
pip install -r requirements.txt
```

Dependency: [experta](https://github.com/nilp0inter/experta) `1.9.4`.

## Run the solver

```bash
python flower_robot_kbs.py
```

Or:

```bash
python output.py
```

### Expected output (basic data)

```
Search strategy: A* (Experta rules + f(n)=g(n)+h(n))
Optimal cost: 28
UI data file: solution_data.js

Solution path:
1. move-right
2. move-down
3. load Pavilion 1:Rose:redx2, ...
...

Generated search states (sample):
1. g=0 h=2 f=2 pos=(2, 3) ...
...

--- DFS preview (Recency-style expansion order) ---
DFS cost: 58
DFS path length: 58
```

First A\* run may take **~1 minute** on basic data (many Experta expansions).

## Visualizer

After running the solver:

```bash
open index.html
```

Or serve locally:

```bash
python -m http.server 8080
# open http://localhost:8080/index.html
```

The page reads `solution_data.js`. **Re-run the solver** after changing test data or code.

### UI features

- **Left:** step-by-step path timeline (click to jump)
- **Center:** circular arena with grid, route, diamond robot marker
- **Right:** play/pause, scrubber, metrics, cargo, pavilion progress
- **Bottom dock:** trips and generated A\* states (expandable)

## Change test scenario

Edit `domain.py`:

```python
DATA_FILE = "test_data.basic.json"   # 5×5, 4 pavilions (default)
# DATA_FILE = "test_data.json"       # 7×6, 5 pavilions (slower)
```

JSON schema:

```json
{
  "grid": { "width": 5, "height": 5 },
  "warehouse": [3, 2],
  "robot_start": [2, 3],
  "pavilions": [
    {
      "name": "Pavilion 1",
      "flower": "Rose",
      "position": [2, 4],
      "needs": { "red": 2, "pink": 1, "white": 1 }
    }
  ]
}
```

Coordinates: `[x, y]` — `x` horizontal, `y` vertical (1-based).

## Programmatic use

```python
from search import solve_astar, solve_dfs

result = solve_astar()
print(result.node.g)           # optimal cost
print(result.node.path)        # action tuple
print(len(result.generated))   # search tree size
```

## Project layout

```
FlowerRobot-KBSProject/
├── flower_robot_kbs.py    # entry point
├── domain.py              # data model
├── facts.py               # Experta facts
├── rules.py               # knowledge base
├── heuristic.py           # h(n)
├── search.py              # A* / DFS
├── output.py              # main + printing
├── ui_export.py           # solution_data.js
├── utils.py
├── index.html             # visualizer
├── solution_data.js       # generated
├── test_data.basic.json
├── test_data.json
├── requirements.txt
└── docs/                  # documentation
```

## Troubleshooting

| Issue | Fix |
|-------|-----|
| `collections.Mapping` error | Ensure `rules.py` patch is present (Python 3.10+) |
| Empty UI / no grid | Run `python flower_robot_kbs.py` first |
| Very slow search | Use `test_data.basic.json`; larger grid explodes state space |
| Wrong optimal cost | Check `DATA_FILE`; verify JSON positions match grid size |

## Git remote

Repository: [MahmoudDe/flower-exhibition-robot](https://github.com/MahmoudDe/flower-exhibition-robot)

```bash
git push origin main
```
