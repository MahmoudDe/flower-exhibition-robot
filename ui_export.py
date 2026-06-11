import json

from domain import EMPTY_LOAD, HEIGHT, INITIAL_REMAINING, ITEM_POSITIONS, ITEMS, MAX_LOAD, START, TARGETS, WAREHOUSE, WIDTH
from heuristic import heuristic
from utils import choose, sub_tuple


OUT_FILE = "solution_data.js"


def item_row(item):
    return [item.pavilion, item.flower, item.color, item.count, list(item.pos)]


def target_row(target):
    name, pos = target
    return {"name": name, "pos": list(pos)}


def target_rows(targets):
    return tuple(map(target_row, targets))


def item_rows(items):
    return tuple(map(item_row, items))


def move_pos(pos, action):
    x, y = pos
    return {
        "move-right": lambda: (x + 1, y),
        "move-left": lambda: (x - 1, y),
        "move-up": lambda: (x, y + 1),
        "move-down": lambda: (x, y - 1),
    }.get(action, lambda: pos)()


def item_match(token, item):
    parts = token.rsplit("x", 1)
    name = parts[0].split(":")
    return (name[0] == item.pavilion) and (name[1] == item.flower) and (name[2] == item.color)


def token_amount(token):
    return int(token.rsplit("x", 1)[1])


def token_value(token, item):
    return choose(item_match(token, item), lambda: token_amount(token), lambda: 0)


def batch_from_tokens(tokens):
    return tuple(map(lambda item: sum(tuple(map(lambda token: token_value(token, item), tokens))), ITEMS))


def batch_from_action(action):
    return batch_from_tokens(tuple(map(lambda token: token.strip(), action.split(" ", 1)[1].split(","))))


def phase_cost(action):
    return choose(action.startswith("move") or action.startswith("load") or action.startswith("unload"), lambda: 1, lambda: 0)


def next_cargo(action, cargo):
    return choose(action.startswith("load"), lambda: batch_from_action(action), lambda: choose(action.startswith("unload"), lambda: sub_tuple(cargo, batch_from_action(action)), lambda: cargo))


def next_delivered(action, delivered):
    return choose(action.startswith("unload"), lambda: tuple(map(lambda pair: pair[0] + pair[1], zip(delivered, batch_from_action(action)))), lambda: delivered)


def next_state(action, pos, cost, cargo, delivered):
    new_pos = move_pos(pos, action)
    new_cost = cost + phase_cost(action)
    new_cargo = next_cargo(action, cargo)
    new_delivered = next_delivered(action, delivered)
    return new_pos, new_cost, new_cargo, new_delivered


def remaining_counts(delivered):
    return tuple(map(lambda pair: pair[0] - pair[1], zip(INITIAL_REMAINING, delivered)))


def state_row(label, pos, cost, cargo, delivered):
    remaining = remaining_counts(delivered)
    cargo_tuple = tuple(cargo)
    h = heuristic(tuple(pos), remaining, cargo_tuple, ITEM_POSITIONS)
    return {
        "label": label,
        "pos": list(pos),
        "cost": cost,
        "h": h,
        "f": cost + h,
        "cargo": list(cargo),
        "delivered": list(delivered),
        "remaining": list(remaining),
        "isGoal": (sum(remaining) == 0) and (sum(cargo_tuple) == 0),
    }


def replay_rows(actions, pos=START, cost=0, cargo=EMPTY_LOAD, delivered=EMPTY_LOAD, label="Initial state"):
    match actions:
        case ():
            return (state_row(label, pos, cost, cargo, delivered),)
        case (action, *rest):
            current = replay_rows((), pos, cost, cargo, delivered, label)
            new_pos, new_cost, new_cargo, new_delivered = next_state(action, pos, cost, cargo, delivered)
            return current + replay_rows(tuple(rest), new_pos, new_cost, new_cargo, new_delivered, action)


def generated_rows(lines):
    return tuple(lines[:24])


def trip_rows(states):
    stops = tuple(filter(lambda state: state["label"].startswith("unload"), states))
    return tuple(map(lambda pair: {"name": "Trip " + str(pair[0] + 1), "label": pair[1]["label"], "cost": pair[1]["cost"]}, enumerate(stops)))


def solution_entry(result, algo_id, name, description):
    states = replay_rows(result.node.path)
    return {
        "id": algo_id,
        "name": name,
        "description": description,
        "cost": result.node.g,
        "generatedTotal": len(result.generated),
        "solutionPath": list(result.node.path),
        "states": states,
        "generated": generated_rows(result.generated),
        "trips": trip_rows(states),
    }


def export_payload(astar_result, dfs_result):
    algorithms = [
        solution_entry(astar_result, "astar", "A*", "Optimal search using f(n) = g(n) + h(n)"),
        solution_entry(dfs_result, "dfs", "DFS", "Depth-first search (stack order, not optimal)"),
    ]
    return {
        "grid": {"width": WIDTH, "height": HEIGHT},
        "warehouse": list(WAREHOUSE),
        "start": list(START),
        "maxLoad": MAX_LOAD,
        "optimalCost": astar_result.node.g,
        "defaultAlgorithm": "astar",
        "items": item_rows(ITEMS),
        "targets": target_rows(TARGETS),
        "algorithms": algorithms,
    }


def write_solution_data(astar_result, dfs_result, path=OUT_FILE):
    payload = export_payload(astar_result, dfs_result)
    text = "window.FLOWER_ROBOT_DATA = " + json.dumps(payload, ensure_ascii=False, indent=2) + ";\n"
    with open(path, "w", encoding="utf-8") as file:
        file.write(text)
