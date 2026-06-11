import json

from cost_estimate import estimate_remaining_cost
from flower_problem import (
    DELIVERY_ITEMS,
    DELIVERY_TARGETS,
    EMPTY_CARGO,
    GRID_HEIGHT,
    GRID_WIDTH,
    INITIAL_REMAINING,
    ITEM_POSITIONS,
    ROBOT_CAPACITY,
    ROBOT_START,
    WAREHOUSE,
)
from helpers import subtract_amounts

VISUALIZER_FILE = "solution_data.js"


def delivery_item_row(item):
    return [item.pavilion, item.flower, item.color, item.count, list(item.pos)]


def delivery_target_row(target):
    name, pos = target
    return {"name": name, "pos": list(pos)}


def move_robot(pos, action):
    x, y = pos
    moves = {
        "move-right": (x + 1, y),
        "move-left": (x - 1, y),
        "move-up": (x, y + 1),
        "move-down": (x, y - 1),
    }
    return moves.get(action, pos)


def token_matches_item(token, item):
    name_part, amount_part = token.rsplit("x", 1)
    pavilion, flower, color = name_part.split(":")
    return pavilion == item.pavilion and flower == item.flower and color == item.color


def read_token_amount(token):
    return int(token.rsplit("x", 1)[1])


def amount_from_token(token, item):
    return read_token_amount(token) if token_matches_item(token, item) else 0


def load_from_tokens(tokens):
    return tuple(sum(amount_from_token(token, item) for token in tokens) for item in DELIVERY_ITEMS)


def load_from_action(action):
    tokens = tuple(token.strip() for token in action.split(" ", 1)[1].split(","))
    return load_from_tokens(tokens)


def step_cost(action):
    return 1 if action.startswith(("move", "load", "unload")) else 0


def cargo_after_action(action, cargo):
    if action.startswith("load"):
        return load_from_action(action)
    if action.startswith("unload"):
        return subtract_amounts(cargo, load_from_action(action))
    return cargo


def delivered_after_action(action, delivered):
    if action.startswith("unload"):
        unload = load_from_action(action)
        return tuple(left + right for left, right in zip(delivered, unload))
    return delivered


def apply_action(action, pos, cost, cargo, delivered):
    return (
        move_robot(pos, action),
        cost + step_cost(action),
        cargo_after_action(action, cargo),
        delivered_after_action(action, delivered),
    )


def remaining_after_delivery(delivered):
    return tuple(left - right for left, right in zip(INITIAL_REMAINING, delivered))


def build_replay_step(label, pos, cost, cargo, delivered):
    remaining = remaining_after_delivery(delivered)
    cargo_tuple = tuple(cargo)
    estimated = estimate_remaining_cost(tuple(pos), remaining, cargo_tuple, ITEM_POSITIONS)
    return {
        "label": label,
        "pos": list(pos),
        "cost": cost,
        "h": estimated,
        "f": cost + estimated,
        "cargo": list(cargo),
        "delivered": list(delivered),
        "remaining": list(remaining),
        "isGoal": sum(remaining) == 0 and sum(cargo_tuple) == 0,
    }


def build_replay_steps(actions, pos=ROBOT_START, cost=0, cargo=EMPTY_CARGO, delivered=EMPTY_CARGO, label="Initial state"):
    steps = (build_replay_step(label, pos, cost, cargo, delivered),)
    for action in actions:
        pos, cost, cargo, delivered = apply_action(action, pos, cost, cargo, delivered)
        steps = steps + (build_replay_step(action, pos, cost, cargo, delivered),)
    return steps


def sample_generated_lines(lines):
    return tuple(lines[:24])


def build_trip_summary(steps):
    unload_steps = tuple(step for step in steps if step["label"].startswith("unload"))
    return tuple(
        {"name": "Trip " + str(index + 1), "label": step["label"], "cost": step["cost"]}
        for index, step in enumerate(unload_steps)
    )


def build_algorithm_entry(result, algo_id, name, description):
    steps = build_replay_steps(result.node.path)
    return {
        "id": algo_id,
        "name": name,
        "description": description,
        "cost": result.node.cost,
        "generatedTotal": result.generated_total,
        "solutionPath": list(result.node.path),
        "states": steps,
        "generated": sample_generated_lines(result.generated_sample),
        "trips": build_trip_summary(steps),
    }


def build_visualizer_payload(best_path_result, depth_first_result):
    algorithms = [
        build_algorithm_entry(best_path_result, "astar", "A*", "Optimal search using f(n) = g(n) + h(n)"),
        build_algorithm_entry(depth_first_result, "dfs", "DFS", "Depth-first search (stack order, not optimal)"),
    ]
    return {
        "grid": {"width": GRID_WIDTH, "height": GRID_HEIGHT},
        "warehouse": list(WAREHOUSE),
        "start": list(ROBOT_START),
        "maxLoad": ROBOT_CAPACITY,
        "optimalCost": best_path_result.node.cost,
        "defaultAlgorithm": "astar",
        "items": tuple(delivery_item_row(item) for item in DELIVERY_ITEMS),
        "targets": tuple(delivery_target_row(target) for target in DELIVERY_TARGETS),
        "algorithms": algorithms,
    }


def save_visualizer_data(best_path_result, depth_first_result, path=VISUALIZER_FILE):
    payload = build_visualizer_payload(best_path_result, depth_first_result)
    text = "window.FLOWER_ROBOT_DATA = " + json.dumps(payload, ensure_ascii=False, indent=2) + ";\n"
    with open(path, "w", encoding="utf-8") as file:
        file.write(text)
