from domain import EMPTY_LOAD, INF, INITIAL_REMAINING, ITEM_POSITIONS, START, Node, Result, State
from heuristic import heuristic
from rules import expand_state, parse_path, parse_tuple
from utils import all_zero, choose


def state_key(x, y, remaining, cargo):
    return (x, y, remaining, cargo)


def generated_line(x, y, remaining, cargo, g):
    h = heuristic((x, y), remaining, cargo, ITEM_POSITIONS)
    return (
        "g="
        + str(g)
        + " h="
        + str(h)
        + " f="
        + str(g + h)
        + " pos=("
        + str(x)
        + ", "
        + str(y)
        + ") cargo="
        + str(cargo)
        + " remaining="
        + str(remaining)
    )


def fact_field(fact, name):
    return fact[name]


def fact_to_node(fact):
    remaining = parse_tuple(fact_field(fact, "remaining"))
    cargo = parse_tuple(fact_field(fact, "cargo"))
    state = State((fact_field(fact, "x"), fact_field(fact, "y")), remaining, cargo)
    return Node(state, fact_field(fact, "g"), parse_path(fact_field(fact, "path")))


def fact_f_value(fact):
    return fact_field(fact, "f")


def push_frontier(frontier, fact, serial):
    return frontier + ((fact_f_value(fact), serial, fact),), serial + 1


def pick_astar(frontier):
    return min(frontier, key=lambda entry: (entry[0], entry[1]))


def pick_dfs(frontier):
    return frontier[-1]


def pop_frontier_simple(frontier, pick):
    entry = pick(frontier)
    index = frontier.index(entry)
    return frontier[:index] + frontier[index + 1 :], entry[2]


def add_successors(frontier, best, generated, serial, facts):
    match facts:
        case ():
            return frontier, best, generated, serial
        case (fact, *rest):
            remaining = parse_tuple(fact_field(fact, "remaining"))
            cargo = parse_tuple(fact_field(fact, "cargo"))
            key = state_key(fact_field(fact, "x"), fact_field(fact, "y"), remaining, cargo)
            g = fact_field(fact, "g")
            line = generated_line(fact_field(fact, "x"), fact_field(fact, "y"), remaining, cargo, g)
            return choose(
                g < best.get(key, INF),
                lambda: add_successors(
                    push_frontier(frontier, fact, serial)[0],
                    best | {key: g},
                    generated + (line,),
                    serial + 1,
                    tuple(rest),
                ),
                lambda: add_successors(frontier, best, generated, serial, tuple(rest)),
            )


def is_goal_fact(fact):
    remaining = parse_tuple(fact_field(fact, "remaining"))
    cargo = parse_tuple(fact_field(fact, "cargo"))
    return all_zero(remaining) and all_zero(cargo)


def make_start_fact():
    x, y = START
    start_remaining = INITIAL_REMAINING
    start_cargo = EMPTY_LOAD
    h = heuristic((x, y), start_remaining, start_cargo, ITEM_POSITIONS)
    return {
        "x": x,
        "y": y,
        "remaining": ",".join(map(str, start_remaining)),
        "cargo": ",".join(map(str, start_cargo)),
        "g": 0,
        "h": h,
        "f": h,
        "path": "",
        "action": "start",
    }


def start_search(mode="astar"):
    start_fact = make_start_fact()
    x = start_fact["x"]
    y = start_fact["y"]
    start_remaining = INITIAL_REMAINING
    start_cargo = EMPTY_LOAD
    pick = choose(mode == "dfs", lambda: pick_dfs, lambda: pick_astar)
    frontier, serial = push_frontier((), start_fact, 0)
    best = {state_key(x, y, start_remaining, start_cargo): 0}
    generated = (generated_line(x, y, start_remaining, start_cargo, 0),)

    while frontier:
        frontier, fact = pop_frontier_simple(frontier, pick)
        key = state_key(
            fact_field(fact, "x"),
            fact_field(fact, "y"),
            parse_tuple(fact_field(fact, "remaining")),
            parse_tuple(fact_field(fact, "cargo")),
        )
        if fact_field(fact, "g") != best.get(key, INF):
            continue
        if is_goal_fact(fact):
            return Result(fact_to_node(fact), generated)
        remaining = parse_tuple(fact_field(fact, "remaining"))
        cargo = parse_tuple(fact_field(fact, "cargo"))
        path = parse_path(fact_field(fact, "path"))
        successors, tree_lines, _solution = expand_state(
            fact_field(fact, "x"),
            fact_field(fact, "y"),
            remaining,
            cargo,
            fact_field(fact, "g"),
            path,
        )
        generated = generated + tree_lines
        frontier, best, generated, serial = add_successors(frontier, best, generated, serial, successors)

    return None


def solve(mode="astar"):
    result = start_search(mode)
    if result is None:
        raise RuntimeError("No solution found for mode=" + mode)
    return result


def solve_astar():
    return solve("astar")


def solve_dfs():
    return solve("dfs")
